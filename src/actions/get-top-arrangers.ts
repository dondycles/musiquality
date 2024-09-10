"use server";

import { createClient } from "@/utils/supabase/server";

export default async function getTopArrangers() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("arranger_metadata")
    .select("*, sheets(id), arranger_followers(*, users(*))");
  if (error) {
    return { error: error.message };
  }
  return { success: data };
}

type GetReturnType = Awaited<ReturnType<typeof getTopArrangers>>;

// Helper type to exclude `undefined` from a type
type ExcludeUndefined<T> = T extends undefined ? never : T;

// Extract the type of one item from the `success` array (excluding `undefined`)
export type TopArrangerItemType = ExcludeUndefined<
  GetReturnType["success"]
> extends (infer T)[]
  ? T
  : never;
