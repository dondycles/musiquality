"use server";

import { signupSchema } from "@/app/(non-arranger)/signup/signup-form";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import createUser from "./create-user";

export default async function signUp(data: z.infer<typeof signupSchema>) {
  const supabase = createClient();
  const { error: authError } = await supabase.auth.signUp(data);
  if (authError) return { error: authError.message };

  const { error: userError } = await createUser({
    avatar_url: "/favicon.ico",
    is_arranger: false,
    email: data.email,
    name: data.name,
  });

  if (userError) return { error: userError };

  return { success: "success" };
}
