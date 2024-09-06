import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import ArrangerMain from "./main";
import { CircleHelp } from "lucide-react";
import { SingleArrangerData } from "@/types/arranger-data";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const supabase = createClient();
  const { data } = await supabase
    .from("arranger_metadata")
    .select("*")
    .eq("user_id", params.id)
    .single();

  return {
    title: data?.display_name,
    openGraph: {
      title: data?.display_name,
      images: data?.avatar_url ?? "https://musiquality.vercel.app/favicon.ico",
    },
  };
}

export default async function ArrangerPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const { data: arrangerData, error } = await supabase
    .from("arranger_metadata")
    .select("*, users(id, sheets(*))")
    .eq("user_id", params.id)
    .single();

  const reconstructArrangerData = () => {
    if (!arrangerData) return;
    const newArrangerData: SingleArrangerData = {
      avatar_url: arrangerData?.avatar_url,
      description: arrangerData.description,
      display_name: arrangerData.display_name,
      id: arrangerData.id,
      user_id: arrangerData.user_id,
      sheets: arrangerData.users?.sheets ?? [],
    };

    return newArrangerData;
  };

  const newArrangerData = reconstructArrangerData();

  if (!newArrangerData)
    return (
      <div className="m-auto flex flex-col gap-4 justify-center items-center text-muted-foreground">
        <CircleHelp size={64} />
        <p className="text-sm">Arranger&apos;s data not found</p>
      </div>
    );
  return <ArrangerMain arranger={newArrangerData} />;
}
