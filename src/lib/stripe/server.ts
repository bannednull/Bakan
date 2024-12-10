'use server';

import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';
import { getURL, toDateTime } from '@/lib/utils';
import { getUser } from '../auth/session';

async function createOrRetrieveCustomer() {
  const user = await getUser();
  if (!user) throw new Error('No session found.');

  let customer: string;
  if (!user.customerId) {
    const userData = await prisma.user.findUnique({
      where: { email: user.email as string },
    });

    if (!userData) throw new Error('User not found.');

    if (!userData.customerId) {
      //create customer in stripe
      const customerStripe = await stripe.customers.create({
        email: user.email as string,
      });
      customer = customerStripe.id;

      //update customerId in prisma
      await prisma.user.update({
        where: { email: user.email as string },
        data: { customerId: customer },
      });
    } else {
      customer = userData.customerId;
    }
  } else {
    customer = user.customerId;
  }

  return customer;
}

export async function checkoutWithStripe(priceId: string) {
  try {
    const customer = await createOrRetrieveCustomer();

    const params: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      allow_promotion_codes: true,
      customer,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      cancel_url: getURL(),
      success_url: getURL('/thankyou'),
    };

    let sessionStripe;
    try {
      sessionStripe = await stripe.checkout.sessions.create(params);
    } catch (error: any) {
      console.log(error);
      throw new Error('Unable to create checkout session.');
    }

    if (sessionStripe) {
      return { sessionId: sessionStripe.id };
    } else {
      throw new Error('Unable to create checkout session.');
    }
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'Error occured.' };
  }
}

export async function handleCheckoutSessionCompleted(data: Stripe.Checkout.Session) {
  const { customer, subscription: subId, mode } = data;

  const user = await prisma.user.findUnique({
    where: { customerId: customer as string },
  });
  if (!user) throw new Error('User not found.');
  const { id: userId } = user;

  if (mode === 'subscription') {
    const subscriptionId = subId as string;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const {
      customer: customerId,
      status,
      items: { data: itemsData },
      current_period_end,
    } = subscription;
    const {
      price: { id: priceId, product: planId },
      plan: { interval },
    } = itemsData[0];

    const endDate = toDateTime(current_period_end).toISOString();

    if (status === 'active') {
      console.log('CREATE SUBSCRIPTION');
      await prisma.subscription.create({
        data: {
          userId,
          subscriptionId,
          customerId: customerId as string,
          product: planId as string,
          plan: priceId,
          period: interval as 'month' | 'year',
          status: 'active',
          endDate,
        },
      });
    }
  }
}
