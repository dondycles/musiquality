import BrandedText from "@/components/branded-text";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import Dashboard from "./dashboard";
import { ChevronLeft } from "lucide-react";

export default async function ArrangersDashboard() {
  const supabase = createClient();
  const { user } = (await supabase.auth.getUser()).data;

  if (!user) redirect("/login");

  const { data: isArranger } = await supabase
    .from("users")
    .select("is_arranger")
    .eq("id", user.id)
    .single();

  if (!isArranger?.is_arranger) redirect("/arranger");

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-40 xl:px-64">
      {/* <header className="flex flex-row gap-4 items-center border-b p-4 pt-0 px-4  lg:px-40 xl:px-64">
        <Link href={"/"}>
          <ChevronLeft size={16} />
        </Link>
        <h1 className="font-gloock font-black text-4xl">
          <BrandedText text="Arranger's Dashboard" />
        </h1>
      </header> */}
      <h1 className="text-sm text-muted-foreground">
        Arranger&apos;s Dashboard
      </h1>
      <Dashboard />
    </div>
  );
}
