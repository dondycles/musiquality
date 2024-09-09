import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ProfileMain from "./main";

export default async function Profile() {
  const supabase = createClient();
  const { user } = (await supabase.auth.getUser()).data;
  if (!user) redirect("/login");
  return (
    <div className="flex flex-col gap-4 px-4 lg:px-40 xl:px-64">
      <h1 className="text-sm text-muted-foreground">User&apos;s Profile</h1>
      <ProfileMain />
    </div>
  );
}
