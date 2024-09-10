import { Card, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";
import SheetOGArtistText from "./sheet-og-artists-text";
import ArrangerAvatar from "../arranger/avatar";
import { SheetData } from "@/types/sheet-data";
import AddToCartBtn from "../add-to-cart-btn";
import SheetThumbnail from "./sheet-thumbnail";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function SheetCard({
  sheet,
  className,
  urlDownload,
}: {
  sheet: SheetData;
  className?: ClassNameValue;
  urlDownload?: string;
}) {
  return (
    <Card
      className={cn(
        "overflow-hidden w-[244px] flex flex-col gap-4 h-full",
        className
      )}
    >
      <Link href={"/sheet/" + sheet.id}>
        <CardContent className="p-0 m-0">
          <SheetThumbnail
            existingThumbnailUrl={sheet.thumbnail_url}
            className="flex items-center justify-center max-w-full"
          />
        </CardContent>
      </Link>
      <CardFooter className="flex flex-col gap-2 items-start h-full b">
        <div className="grid grid-cols-[16px,1fr] gap-1">
          <ArrangerAvatar
            arranger={sheet.arranger_metadata?.user_id ?? ""}
            url={sheet.arranger_metadata?.avatar_url}
          />
          <Link
            href={"/arranger/" + sheet.arranger_id}
            className="truncate my-auto text-xs text-muted-foreground"
          >
            {sheet.arranger_metadata?.display_name}
          </Link>
        </div>
        <div className="flex flex-col flex-1 w-full">
          <Link href={"/sheet/" + sheet.id} className="font-semibold">
            {sheet.title}
          </Link>
          <SheetOGArtistText
            className="mb-2"
            artists={sheet.og_artists_array!}
          />
          {urlDownload ? (
            <Button asChild className="mb-0 mt-auto">
              <Link href={urlDownload}>View </Link>
            </Button>
          ) : (
            <AddToCartBtn key={sheet.id} sheet={sheet} />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
