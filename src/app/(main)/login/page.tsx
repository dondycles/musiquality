import getUser from "@/actions/getuser";
import LoginForm from "./login-form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getUser();
  if (user) redirect("/");
  return (
    <div className="flex-1 flex flex-col  gap-4 items-center justify-center">
      <p className="font-gloock text-4xl font-black">Log In</p>
      <LoginForm />
    </div>
  );
}
