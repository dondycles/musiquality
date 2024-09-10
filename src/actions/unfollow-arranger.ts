"use server";

import { createClient } from "@/utils/supabase/server";

export default async function unfollowArranger(id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("arranger_followers")
    .delete()
    .eq("arranger_id", id);
  if (error) return { error: error.message };
  return { success: "Unfollowed!" };
}
