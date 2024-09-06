import { createClient } from "@/utils/supabase/server";
import SignupForm from "./signup-form";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const supabase = createClient();
  const { user } = (await supabase.auth.getUser()).data;
  if (user) redirect("/");
  return (
    <div className="flex-1 flex flex-col  gap-4 items-center justify-center px-4 lg:px-40 xl:px-64">
      <p className="font-gloock text-4xl font-black">Sign Up</p>
      <SignupForm />
    </div>
  );
}
