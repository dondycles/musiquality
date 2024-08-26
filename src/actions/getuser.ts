"use server";

import { createClient } from "@/utils/supabase/server";

export default async function getUser() {
  const supabase = createClient();
  return (await supabase.auth.getUser()).data.user;
}
