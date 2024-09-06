import { cn } from "@/lib/utils";
import { originialArtistSchema } from "@/types/original-artist";
import { ClassNameValue } from "tailwind-merge";
import { z } from "zod";

export type original_artist = z.infer<typeof originialArtistSchema>;
export default function SheetOGArtistText({
  artists,
  className,
}: {
  artists: original_artist;
  className?: ClassNameValue;
}) {
  return (
    <p className={cn("text-muted-foreground text-sm truncate", className)}>
      {artists
        .filter((artist) => artist !== "")
        .map((artist, i) => `${artist}${i !== artists.length - 1 ? ", " : ""}`)}
    </p>
  );
}
