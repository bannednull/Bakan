'use server';

import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getURL, toDateTime } from '@/lib/utils';

async function createOrRetrieveCustomer() {
  const session = await auth();
  if (!session) throw new Error('No session found.');

  let customer: string;
  if (!session.user.customerId) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!user) throw new Error('User not found.');

    if (!user.customerId) {
      //create customer in stripe
      const customerStripe = await stripe.customers.create({
        email: session.user.email as string,
      });
      customer = customerStripe.id;

      //update customerId in prisma
      await prisma.user.update({
        where: { email: session.user.email as string },
        data: { customerId: customer },
      });
    } else {
      customer = user.customerId;
    }
  } else {
    customer = session.user.customerId;
  }

  return customer;
}

export async function checkoutWithStripe(priceId: string) {
  try {
    const customer = await createOrRetrieveCustomer();

    const params: Stripe.Checkout.SessionCreateParams = {
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
      success_url: getURL('/dashboard'),
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

export async function manageSubscription(subscriptionId: string, customerId: string) {
  const user = await prisma.user.findUnique({
    where: { customerId },
  });
  if (!user) throw new Error('User not found.');
  const { id: userId } = user;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const endDate = toDateTime(subscription.current_period_end).toISOString();
  const data = {
    userId,
    subscriptionId,
    customerId,
    product: subscription.items.data[0].price.product as string,
    plan: subscription.items.data[0].price.id as string,
    period: subscription.items.data[0].plan.interval as 'month' | 'year',
    status: subscription.status as string,
    endDate,
  };

  await prisma.subscription.upsert({
    where: { subscriptionId },
    create: data,
    update: data,
  });
}
