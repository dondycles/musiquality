"use server";

import { createClient } from "@/utils/supabase/server";

export default async function getSheetUrl(sheetId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("sheets_url")
    .select("url")
    .eq("sheet", sheetId)
    .single();
  if (error) return { error: error.message };
  return { success: data.url };
}
