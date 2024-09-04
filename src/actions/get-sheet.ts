"use server";

import { createClient } from "@/utils/supabase/server";

export default async function getSheet(id: string) {
  const supabase = createClient();
  return await supabase
    .from("sheets")
    .select("*, users(id, arranger_metadata(*))")
    .eq("id", id)
    .single();
}
