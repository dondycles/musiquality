"use server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!);

export default async function createPayementIntent(amount: number) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      hehe: "tangina mo",
    },
  });
  return {
    success: {
      paymentIntentID: paymentIntent.id,
      clientSecretID: paymentIntent.client_secret,
    },
  };
}
