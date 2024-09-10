import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SheetData } from "@/types/sheet-data";
import SheetOGArtistText from "./sheet-og-artists-text";
import AddToCartBtn from "../add-to-cart-btn";
import Link from "next/link";
import { Button } from "../ui/button";

export default function SheetBar({ sheet }: { sheet: SheetData }) {
  return (
    <div className="col-span-1 row-span-1 p-2 flex items-center gap-2 cursor-pointer">
      <Link href={`/arranger/${sheet.arranger_metadata?.user_id}`}>
        <Avatar className="size-12">
          <AvatarImage
            src={sheet.arranger_metadata?.avatar_url ?? "/favicon.ico"}
            alt={sheet.arranger_metadata?.display_name}
          />
          <AvatarFallback className="font-gloock">MQ</AvatarFallback>
        </Avatar>
      </Link>
      <div className="grid">
        <Link className="truncate text-sm" href={`/sheet/${sheet.id}`}>
          {sheet.title}
        </Link>
        <SheetOGArtistText
          className="text-xs"
          artists={sheet.og_artists_array!}
        />
      </div>
      {sheet.sheets_url ? (
        <Button asChild className="ml-auto mr-0">
          <Link href={sheet.sheets_url.url}>View </Link>
        </Button>
      ) : (
        <AddToCartBtn
          key={sheet.id}
          branded={false}
          containerClassName="w-fit my-auto ml-auto mr-0"
          textClassName="text-sm sm:text-sm md:text-base"
          sheet={sheet}
        />
      )}
    </div>
  );
}
