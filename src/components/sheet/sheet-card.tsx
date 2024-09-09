import { Card, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";
import SheetOGArtistText, { original_artist } from "./sheet-og-artists-text";
import ArrangerAvatar from "../arranger/avatar";
import { SheetData } from "@/types/sheet-data";
import AddToCartBtn from "../add-to-cart-btn";
import SheetThumbnail from "./sheet-thumbnail";
import Head from "next/head";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

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
    <>
      <Head>
        <title>{sheet.title}</title>
        <meta
          name="description"
          content={`${sheet.title} arranged by ${sheet.users?.arranger_metadata?.display_name}`}
        />
        <meta property="og:title" content={sheet.title} />
        <meta
          property="og:description"
          content={`${sheet.title} arranged by ${sheet.users?.arranger_metadata?.display_name}`}
        />
        <meta property="og:image" content={sheet.thumbnail_url} />
      </Head>
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
              className="mb-2"
              artists={sheet.original_artist as original_artist}
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
    </>
  );
}
