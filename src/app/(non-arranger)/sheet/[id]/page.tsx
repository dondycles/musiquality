import { createClient } from "@/utils/supabase/server";
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
import { FiShoppingCart } from "react-icons/fi";
import ArrangerAvatar from "@/components/arranger-avatar";

export default async function Sheet({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data } = await supabase
    .from("sheets")
    .select("*, users(id, arranger_metadata(*))")
    .eq("id", params.id)
    .single();

  if (data)
    return (
      <div className="w-full flex">
        <div className="flex flex-col-reverse sm:flex-row-reverse justify-end items-start gap-4 mx-auto">
          <div className="self-stretch flex flex-col gap-4">
            <div className="flex flex-col items-center sm:items-start">
              <div className="text-sm text-muted-foreground flex items-center gap-2 mb-1">
                <ArrangerAvatar
                  className="size-9"
                  url={data.users?.arranger_metadata[0].avatar_url}
                />{" "}
                <p className="flex flex-col ">
                  <span>Arranged by</span>
                  <span>{data.users?.arranger_metadata[0].display_name}</span>
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
              <div className="flex gap-2 items-center justify-center sm:justify-start">
                <BrandedText
                  className="text-primary"
                  text={String("$" + data.price)}
                />
                <Button>Buy</Button>
                <Button variant={"outline"} size={"icon"}>
                  <FiShoppingCart />
                </Button>
              </div>
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
