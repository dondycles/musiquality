"use server";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  avatar_url: z.string().url(),
  is_arranger: z.boolean().default(false),
});

export default async function createUser(
  user: z.infer<typeof createUserSchema>
) {
  const supabase = createClient();
  const { error } = await supabase.from("users").insert({
    ...user,
    arrangers_metadata: {
      avatar: user.avatar_url,
      description: "",
      display_name: user.name,
      links: [],
    },
  });
  if (error) return { error: error.message };
  return { success: "User created!" };
}
