import SheetOGArtistText, {
  original_artist,
} from "@/components/sheet/sheet-og-artists-text";
import SheetInstrumentsText, {
  instruments,
} from "@/components/sheet/sheet-instruments-text";
import BrandedText from "@/components/branded-text";
import SheetThumbnail from "@/components/sheet/sheet-thumbnail";
import { Check, CircleHelp, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ArrangerAvatar from "@/components/arranger/avatar";
import { Metadata } from "next";
import getSheet from "@/actions/get-sheet";
import AddToCartBtn from "@/components/add-to-cart-btn";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { data } = await getSheet(Number(params.id));
  return {
    title: `${data?.title} - Arranged by ${data?.arranger_metadata?.display_name}`,
    openGraph: {
      title: `${data?.title} - Arranged by ${data?.arranger_metadata?.display_name}`,
      images: data?.thumbnail_url,
    },
    authors: [
      {
        name: data?.arranger_metadata?.display_name,
        url: `https://musiquality.vercel.app/arranger/${data?.arranger_metadata?.user_id}}`,
      },
    ],
  };
}

export default async function Sheet({ params }: { params: { id: string } }) {
  const { data } = await getSheet(Number(params.id));

  if (!data)
    return (
      <div className="m-auto flex flex-col gap-4 justify-center items-center text-muted-foreground">
        <CircleHelp size={64} />
        <p className="text-sm">Sheets&apos;s data not found</p>
      </div>
    );
  return (
    <div className="w-full flex flex-1 px-4 lg:px-40 xl:px-64">
      <div className="flex flex-col-reverse sm:flex-row-reverse justify-end items-start gap-4 mx-auto h-fit">
        <div className="self-stretch flex flex-col gap-4">
          <div className="flex flex-col items-center sm:items-start">
            <div className="text-sm text-muted-foreground flex items-center gap-2 mb-1">
              <ArrangerAvatar
                arranger={data.arranger_metadata?.user_id ?? ""}
                className="size-9"
                url={data.arranger_metadata?.avatar_url}
              />{" "}
              <p className="flex flex-col ">
                <span>Arranged by</span>
                <span>{data.arranger_metadata?.display_name}</span>
              </p>
            </div>
            <BrandedText
              useH1
              className="max-w-72 text-center sm:text-left"
              text={data.title}
            />
            <SheetOGArtistText artists={data.og_artists_array!} />
          </div>
          <div className="mb-0 mt-auto text-sm text-muted-foreground capitalize flex flex-col justify-center">
            <p>Other info:</p>
            <SheetInstrumentsText instruments={data.instruments_array!} />
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
            <AddToCartBtn key={data.id} sheet={data} />
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
