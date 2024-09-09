"use server";

import { arrangersMetadataSchema } from "@/types/arrangers-metadata";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export default async function updateUser(
  metadata: z.infer<typeof arrangersMetadataSchema>,
  id: string
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("users")
    .update(metadata)
    .eq("user_id", id);
  if (error) return { error: error.message };
  return { success: "User updated!" };
}
