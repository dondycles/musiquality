import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import ArrangerBadges from "./badges";
import { ArrangerData } from "../../types/arranger-data";
import Link from "next/link";
import ArrangerAvatar from "./avatar";

export default function ArrangerBar({ arranger }: { arranger: ArrangerData }) {
  return (
    <div className="col-span-1 row-span-1 p-2 flex items-center gap-2">
      <ArrangerAvatar
        arranger={arranger.users?.id ?? ""}
        className="size-12"
        url={arranger.avatar_url}
      />
      <div className="grid gap-1">
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
      <Button variant={"ghost"} size={"icon"} className="ml-auto mr-0">
        <Heart size={16} />
      </Button>
    </div>
  );
}
