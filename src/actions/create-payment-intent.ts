"use server";
import { SheetData } from "@/types/sheet-data";
import Stripe from "stripe";
import saveTransaction from "./save-transaction";

const stripe = new Stripe(process.env.STRIPE_SECRET!);

export default async function createPaymentIntent(
  amount: number,
  sheets: Pick<SheetData, "id" | "price">[]
) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      sheets: JSON.stringify(sheets),
    },
  });

  await saveTransaction(paymentIntent.id, sheets, amount);

  return paymentIntent;
}
