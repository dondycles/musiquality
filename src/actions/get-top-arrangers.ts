"use server";

import { createClient } from "@/utils/supabase/server";

export default async function getTopArrangers() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("arranger_metadata")
    .select("*, users(id, sheets(id))");
  if (error) {
    return { error: error.message };
  }

  return { success: data };
}
