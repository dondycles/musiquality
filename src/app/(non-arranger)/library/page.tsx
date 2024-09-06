import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LibraryMain from "./main";

export default async function Library() {
  const supabase = createClient();
  const { user } = (await supabase.auth.getUser()).data;
  if (!user) redirect("/login");
  return <LibraryMain />;
}
