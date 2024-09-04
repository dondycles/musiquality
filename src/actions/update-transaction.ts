"use server";

import { createClient } from "@/utils/supabase/server";

export default async function updateTransaction(
  paymentIntent: string,
  status: string
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("transactions")
    .update({ status })
    .eq("payment_intent_id", paymentIntent);
  if (error) return { error: error.message };
  return { success: "Transaction saved" };
}
