"use server";

import { createClient } from "@/utils/supabase/server";

export default async function getMyTransactions() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return { error: error.message };
  return { success: data };
}
