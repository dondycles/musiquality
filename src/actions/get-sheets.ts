"use server";

import { createClient } from "@/utils/supabase/server";

export default async function getSheets() {
  const supabase = createClient();
  return supabase.from("sheets").select("*, users(id, arranger_metadata(*))");
}
