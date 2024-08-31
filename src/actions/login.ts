"use server";

import { loginSchema } from "@/app/(non-arranger)/login/login-form";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export default async function login(data: z.infer<typeof loginSchema>) {
  const supabase = createClient();
  return await supabase.auth.signInWithPassword(data);
}
