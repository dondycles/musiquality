"use server";

import { createClient } from "@/utils/supabase/server";

export default async function applyArtist(id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("users")
    .update({ is_applying: true })
    .eq("id", id);

  if (error) return { error: error.message };
  return { success: "Done" };
}
