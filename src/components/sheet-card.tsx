import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import Link from "next/link";
import SheetOGArtistText, { original_artist } from "./sheet-og-artists-text";
import SheetThumbnail from "./sheet-thumbnail";
import ArrangerAvatar from "./arranger-avatar";
import { SheetData } from "@/types/sheet-data";
import AddToCartBtn from "./add-to-cart-btn";
import CurrencyText from "./currency-text";

export default function SheetCard({ sheet }: { sheet: SheetData }) {
  return (
    <Card className="shadow-none overflow-hidden bg-muted w-[244px] flex flex-col gap-4 h-full">
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
          <ArrangerAvatar url={sheet.users?.arranger_metadata?.avatar_url} />
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

          <AddToCartBtn sheet={sheet} />
        </div>
      </CardFooter>
    </Card>
  );
}
