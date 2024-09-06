"use server";

import { createClient } from "@/utils/supabase/server";

export default async function signOut() {
  const supabase = createClient();
  return supabase.auth.signOut();
}
