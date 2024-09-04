"use server";

import { createClient } from "@/utils/supabase/server";

export default async function saveSheetToLibrary(
  id: number,
  payment_intent: string
) {
  const supabase = createClient();
  await supabase.from("library").insert({
    sheet: id,
    payment_intent,
  });
}
