"use server";

import { createClient } from "@/utils/supabase/server";

export default async function getSheets() {
  const supabase = createClient();
  return supabase.from("sheets").select("*, arranger_metadata(*)");
}
