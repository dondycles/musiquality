"use server";

import { signupSchema } from "@/app/(main)/signup/signup-form";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export default async function signUp(data: z.infer<typeof signupSchema>) {
  const supabase = createClient();
  const auth = await supabase.auth.signUp(data);
  if (auth.error) return { error: auth.error.message };
  const db = await supabase
    .from("users")
    .insert({ email: data.email, name: data.name, isSeller: false });
  if (db.error) return { error: db.error.message };
  return { success: "success" };
}
