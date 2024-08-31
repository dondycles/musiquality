import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Library() {
  const supabase = createClient();
  const { user } = (await supabase.auth.getUser()).data;
  if (!user) redirect("/login");
  return <div></div>;
}
