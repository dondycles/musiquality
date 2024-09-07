import ArrangerAvatar from "./avatar";
import ArrangerBadges from "./badges";
import { ArrangerData } from "../../types/arranger-data";
import Link from "next/link";
import Head from "next/head";

export default function ArrangerCard({ arranger }: { arranger: ArrangerData }) {
  return (
    <>
      <Head>
        <title>{arranger.display_name}</title>
        <meta
          name="description"
          content={`${arranger.users?.sheets} sheets arranged by ${arranger.display_name}`}
        />
        <meta property="og:title" content={arranger.display_name} />
        <meta
          property="og:description"
          content={`${arranger.users?.sheets} sheets arranged by ${arranger.display_name}`}
        />
        <meta
          property="og:image"
          content={arranger.avatar_url ?? "/favicon.ico"}
        />
      </Head>

      <div className="h-full w-48 border rounded-md flex flex-col gap-2 p-1 sm:p-4">
        <ArrangerAvatar
          arranger={arranger.users?.id ?? ""}
          className="w-full h-auto aspect-square rounded-md"
          url={arranger.avatar_url ?? "/favicon.ico"}
        />
        <div className="mb-0 mt-auto w-full overflow-auto flex flex-col gap-2">
          <Link
            href={`/arranger/${arranger.users?.id}`}
            className="truncate text-sm"
          >
            {arranger.display_name}
          </Link>
          <ArrangerBadges
            className="truncate"
            followers={123}
            sheets={arranger.users?.sheets.length}
          />
        </div>
      </div>
    </>
  );
}
