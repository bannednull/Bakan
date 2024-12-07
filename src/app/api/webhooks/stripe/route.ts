import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { handleCheckoutSessionCompleted } from '@/lib/stripe/server';
import { env } from '@/lib/env';
import { headers } from 'next/headers';

const relevantEvents = new Set(['checkout.session.completed']);

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = await headers();
  const sig = headerPayload.get('stripe-signature');
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;
  try {
    if (!sig || !webhookSecret) return new Response('Webhook secret not found.', { status: 400 });
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return new Response(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'checkout.session.completed':
          await handleCheckoutSessionCompleted(event.data.object);
          break;
        default:
          throw new Error('Unhandled relevant event!');
      }
    } catch {
      return new Response('Webhook handler failed', {
        status: 400,
      });
    }
  } else {
    return new Response(`Unsupported event type: ${event.type}`, {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ result: event, ok: true, received: true }));
}
