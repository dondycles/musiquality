import ArrangerAvatar from "./avatar";
import ArrangerBadges from "./badges";
import { ArrangerData } from "../../types/arranger-data";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Page Title",
};

export default function ArrangerCard({ arranger }: { arranger: ArrangerData }) {
  return (
    <div className="h-full w-48 border rounded-md flex flex-col gap-2 p-1 sm:p-4">
      <ArrangerAvatar
        arranger={arranger.user_id}
        className="w-full h-auto aspect-square rounded-md"
        url={arranger.avatar_url ?? "/favicon.ico"}
      />
      <div className="mb-0 mt-auto w-full overflow-auto flex flex-col gap-2">
        <Link
          href={`/arranger/${arranger.user_id}`}
          className="truncate text-sm"
        >
          {arranger.display_name}
        </Link>
        <ArrangerBadges
          className="truncate"
          followers={123}
          sheets={arranger.sheets.length}
        />
      </div>
    </div>
  );
}
