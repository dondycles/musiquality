import BrandedText from "@/components/branded-text";
import { createClient } from "@/utils/supabase/server";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import ArrangerBasicInfoCard from "./arranger-basic-info-card";
import TabsSection from "./tabs-section";
import Dashboard from "./dashboard";

export default async function ArrangersDashboard() {
  const supabase = createClient();
  const { user } = (await supabase.auth.getUser()).data;

  if (!user) redirect("/login");
  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-row gap-4 items-center border-b p-4 pt-0 -mx-4">
        <Link href={"/"}>
          <ChevronLeftIcon />
        </Link>
        <h1 className="font-gloock font-black text-4xl">
          <BrandedText text="Arranger's Dashboard" />
        </h1>
      </header>
      <Dashboard />
    </div>
  );
}
