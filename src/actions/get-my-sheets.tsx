"use server";

import { createClient } from "@/utils/supabase/server";

export default async function getMySheets() {
  const supabase = createClient();
  const { count } = await supabase.from("sheets").select();
  return;
}
