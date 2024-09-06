"use server";

import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export default async function getUser(authData: User) {
  const supabase = createClient();
  if (!authData) return { error: "User not found!" };
  const { data: dbData, error: dbError } = await supabase
    .from("users")
    .select(
      "*, sheets(*), arranger_metadata(*), transactions(*, library(*, sheets(*, sheets_url(*))))"
    )
    .eq("id", authData.id)
    .single();
  if (dbError) return { error: dbError.message, success: null };
  if (!dbData) return { error: "User not found in database!", success: null };

  const reconstructUserData = () => {
    const library: (typeof dbData)["transactions"][0]["library"][] = [];

    dbData.transactions.forEach((trans) => {
      library.push(trans.library);
    });

    const newUserData = {
      ...dbData,
      ...authData,
      avatar_url: dbData.avatar_url ?? authData.user_metadata.avatar_url,
      name: dbData.name ?? authData.user_metadata.name,
      library: library[0] ?? [],
    };
    return newUserData;
  };

  const newUserData = reconstructUserData();

  return {
    success: newUserData,
    error: null,
  };
}
