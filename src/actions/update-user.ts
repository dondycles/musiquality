"use server";

import { userDataSchema } from "@/types/user-data";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export default async function updateUser(
  data: z.infer<typeof userDataSchema>,
  id: string
) {
  const supabase = createClient();
  const { error } = await supabase.from("users").update(data).eq("id", id);
  if (error) return { error: error.message };
  return { success: "User updated!" };
}
