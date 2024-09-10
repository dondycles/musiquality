"use server";

import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export default async function getUser(authData: User) {
  const supabase = createClient();
  if (!authData) return { error: "User not found!" };
  const { data: dbData, error: dbError } = await supabase
    .from("users")
    .select(
      "*, arranger_followers(*, arranger_metadata(*, sheets(count), arranger_followers(*, users(*)))), arranger_metadata(*, sheets(*), arranger_followers(*, users(*))), transactions(*, library(*, sheets(*, sheets_url(*), arranger_metadata(*))))"
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
      library: library.flatMap((lib) => lib),
    };
    return newUserData;
  };

  const newUserData = reconstructUserData();
  return {
    success: newUserData,
    error: null,
  };
}

type GetUserReturnType = Awaited<ReturnType<typeof getUser>>;

// Exclude null from the success type
type ExcludeNull<T> = T extends undefined
  ? never
  : T | T extends null
  ? never
  : T;

// Extract the type of the success property, ensuring it doesn't include null
export type UserDataTypes = ExcludeNull<GetUserReturnType["success"]>;
