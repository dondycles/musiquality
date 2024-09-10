"use server";

import { createClient } from "@/utils/supabase/server";

export default async function getOneArranger(id: string) {
  const supabase = createClient();
  const { data: arrangerData, error } = await supabase
    .from("arranger_metadata")
    .select("*, sheets(*), arranger_followers(*)")
    .eq("user_id", id)
    .single();
  if (error) return { error: error.message };
  return { success: arrangerData };
}

type GetUserReturnType = Awaited<ReturnType<typeof getOneArranger>>;

// Exclude null from the success type
type ExcludeNull<T> = T extends undefined
  ? never
  : T | T extends null
  ? never
  : T;

// Extract the type of the success property, ensuring it doesn't include null
export type SingleArrangerDataTypes = ExcludeNull<GetUserReturnType["success"]>;
