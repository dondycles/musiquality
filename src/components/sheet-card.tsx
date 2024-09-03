import { FiShoppingCart } from "react-icons/fi";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Database } from "../../database.types";
import Link from "next/link";
import SheetOGArtistText, { original_artist } from "./sheet-og-artists-text";
import SheetThumbnail from "./sheet-thumbnail";
import BrandedText from "./branded-text";
import ArrangerAvatar from "./arranger-avatar";

export default function SheetCard({
  sheet,
}: {
  sheet: Database["public"]["Tables"]["sheets"]["Row"] & {
    users: {
      id: Database["public"]["Tables"]["users"]["Row"]["id"];
      arranger_metadata: Database["public"]["Tables"]["arranger_metadata"]["Row"][];
    } | null;
  };
}) {
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
          <ArrangerAvatar url={sheet.users?.arranger_metadata[0].avatar_url} />
          <Link
            href={"/arranger/" + sheet.arranger}
            className="truncate my-auto text-xs text-muted-foreground"
          >
            {sheet.users?.arranger_metadata[0].display_name}
          </Link>
        </div>
        <div className="flex flex-col flex-1">
          <Link href={"/sheet/" + sheet.id} className="font-semibold">
            {sheet.title}
          </Link>
          <SheetOGArtistText
            artists={sheet.original_artist as original_artist}
          />
          <BrandedText
            text={"$" + String(sheet.price)}
            className="mt-auto mb-0"
          />
        </div>
        <div className="flex gap-4 w-full mb-0 mt-auto">
          <Button className="flex-1 ">Buy</Button>
          <Button size={"icon"} variant={"outline"}>
            <FiShoppingCart />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
