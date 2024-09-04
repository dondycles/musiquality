"use server";

import { createClient } from "@/utils/supabase/server";

export default async function getUser() {
  const supabase = createClient();
  const { user: authData } = (await supabase.auth.getUser()).data;
  if (!authData) return { error: "User not found!" };
  const { data: dbData, error: dbError } = await supabase
    .from("users")
    .select(
      "*, arranger_metadata(*), transactions(*, library(*, sheets(*, sheets_url(*)))), library(*, sheets(*, sheets_url(*)))"
    )
    .eq("id", authData.id)
    .single();
  if (dbError) return { error: dbError.message, success: null };
  if (!dbData) return { error: "User not found in database!", success: null };

  return {
    success: {
      ...dbData,
      ...authData,
      avatar_url: dbData.avatar_url ?? authData.user_metadata.avatar_url,
      name: dbData.name ?? authData.user_metadata.name,
    },
    error: null,
  };
}
