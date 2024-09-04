import SheetOGArtistText, {
  original_artist,
} from "@/components/sheet-og-artists-text";
import SheetInstrumentsText, {
  instruments,
} from "@/components/sheet-instruments-text";
import BrandedText from "@/components/branded-text";
import SheetThumbnail from "@/components/sheet-thumbnail";
import { Check, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ArrangerAvatar from "@/components/arranger-avatar";
import { Metadata } from "next";
import getSheet from "@/actions/get-sheet";
import CurrencyText from "@/components/currency-text";
import AddToCartBtn from "@/components/add-to-cart-btn";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { data } = await getSheet(params.id);
  return {
    title: `${data?.title} - Arranged by ${data?.users?.arranger_metadata?.display_name}`,
    openGraph: {
      title: `${data?.title} - Arranged by ${data?.users?.arranger_metadata?.display_name}`,
      images: data?.thumbnail_url,
    },
    authors: [
      {
        name: data?.users?.arranger_metadata?.display_name,
        url: `https://musiquality.vercel.app/arranger/${data?.users?.arranger_metadata?.user_id}}`,
      },
    ],
  };
}

export default async function Sheet({ params }: { params: { id: string } }) {
  const { data } = await getSheet(params.id);

  if (data)
    return (
      <div className="w-full flex flex-1">
        <div className="flex flex-col-reverse sm:flex-row-reverse justify-end items-start gap-4 mx-auto h-fit">
          <div className="self-stretch flex flex-col gap-4">
            <div className="flex flex-col items-center sm:items-start">
              <div className="text-sm text-muted-foreground flex items-center gap-2 mb-1">
                <ArrangerAvatar
                  className="size-9"
                  url={data.users?.arranger_metadata?.avatar_url}
                />{" "}
                <p className="flex flex-col ">
                  <span>Arranged by</span>
                  <span>{data.users?.arranger_metadata?.display_name}</span>
                </p>
              </div>
              <BrandedText
                useH1
                className="max-w-72 text-center sm:text-left"
                text={data.title}
              />
              <SheetOGArtistText
                artists={data.original_artist as original_artist}
              />
            </div>
            <div className="mb-0 mt-auto text-sm text-muted-foreground capitalize flex flex-col justify-center">
              <p>Other info:</p>
              <SheetInstrumentsText
                instruments={data.instrument as instruments}
              />
              <p>{data.difficulty}</p>
              <p className="flex items-center ">
                {data.with_chords ? (
                  <Check className="size-4 mr-1 text-green-400" />
                ) : (
                  <X className="size-4 mr-1 text-red-400" />
                )}
                Chords
              </p>
              <p className="flex items-center">
                {data.with_lyrics ? (
                  <Check className="size-4 mr-1 text-green-400" />
                ) : (
                  <X className="size-4 mr-1 text-red-400" />
                )}
                Lyrics
              </p>

              <Separator className="my-2" />
              <AddToCartBtn sheet={data} />
            </div>
          </div>
          <SheetThumbnail
            className="border rounded-md overflow-hidden mx-auto sm:m-0"
            existingThumbnailUrl={data.thumbnail_url}
          />
        </div>
      </div>
    );
}
