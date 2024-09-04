import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";

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
  const { data } = await supabase
    .from("arranger_metadata")
    .select("*")
    .eq("user_id", params.id)
    .single();
  return <div>{JSON.stringify(data)}</div>;
}
