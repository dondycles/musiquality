import { Card, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";
import SheetOGArtistText, { original_artist } from "./sheet-og-artists-text";
import ArrangerAvatar from "../arranger/avatar";
import { SheetData } from "@/types/sheet-data";
import AddToCartBtn from "../add-to-cart-btn";
import SheetThumbnail from "./sheet-thumbnail";

export default function SheetCard({ sheet }: { sheet: SheetData }) {
  return (
    <Card className="overflow-hidden w-[244px] flex flex-col gap-4 h-full ">
      <Link href={"/sheet/" + sheet.id}>
        <CardContent className="p-0 m-0">
          <SheetThumbnail
            existingThumbnailUrl={sheet.thumbnail_url}
            className="flex items-center justify-center max-w-full"
          />
        </CardContent>
      </Link>
      <CardFooter className="flex flex-col gap-2 items-start h-full">
        <div className="grid grid-cols-[16px,1fr] gap-1">
          <ArrangerAvatar
            arranger={sheet.users?.arranger_metadata?.user_id ?? ""}
            url={sheet.users?.arranger_metadata?.avatar_url}
          />
          <Link
            href={"/arranger/" + sheet.arranger}
            className="truncate my-auto text-xs text-muted-foreground"
          >
            {sheet.users?.arranger_metadata?.display_name}
          </Link>
        </div>
        <div className="flex flex-col flex-1 w-full">
          <Link href={"/sheet/" + sheet.id} className="font-semibold">
            {sheet.title}
          </Link>
          <SheetOGArtistText
            artists={sheet.original_artist as original_artist}
          />

          <AddToCartBtn key={sheet.id} sheet={sheet} />
        </div>
      </CardFooter>
    </Card>
  );
}
