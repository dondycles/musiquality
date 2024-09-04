"use server";

import { SheetData } from "@/types/sheet-data";
import { createClient } from "@/utils/supabase/server";

export default async function saveTransaction(
  paymentIntent: string,
  sheets: Pick<SheetData, "id" | "price">[],
  price: number
) {
  const supabase = createClient();
  const { error } = await supabase.from("transactions").insert({
    payment_intent_id: paymentIntent,
    metadata: sheets,
    price,
  });
  if (error) return { error: error.message };
  return { success: "Transaction saved" };
}
