import LoginForm from "./login-form";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function LoginPage() {
  const supabase = createClient();
  const { user } = (await supabase.auth.getUser()).data;
  if (user) redirect("/");
  return (
    <div className="flex-1 flex flex-col  gap-4 items-center justify-center px-4 lg:px-40 xl:px-64">
      <h1 className="font-gloock text-4xl font-black">Log In</h1>
      <LoginForm />
    </div>
  );
}
