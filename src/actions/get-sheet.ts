"use server";

import { createClient } from "@/utils/supabase/server";

export default async function getSheet(id: number) {
  const supabase = createClient();
  return await supabase
    .from("sheets")
    .select("*, arranger_metadata(*, arranger_followers(*, users(*)))")
    .eq("id", id)
    .single();
}
