import BrandedText from "@/components/branded-text";
import SheetDownloadLink from "@/components/sheet-download-link";
import SheetOGArtistText, {
  original_artist,
} from "@/components/sheet-og-artists-text";
import SheetThumbnail from "@/components/sheet-thumbnail";
import { Separator } from "@/components/ui/separator";
import { UserData } from "@/types/user-data";
import { Loader } from "lucide-react";
import { Suspense } from "react";

export default function LibrarySheets({ userData }: { userData: UserData }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground text-sm">
        Purchased Sheets ({userData.library.length})
      </p>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {userData.library.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col border rounded-md p-1 sm:p-4 w-full text-center self-stretch"
            >
              <SheetThumbnail
                existingThumbnailUrl={item.sheets?.thumbnail_url}
                className="w-full flex-1 mx-auto"
              />
              <Separator />
              <BrandedText
                text={item.sheets?.title!}
                className="text-lg sm:text-lg md:text-lg line-clamp-1"
              />
              <SheetOGArtistText
                artists={item.sheets?.original_artist as original_artist}
                className="text-xs mb-4 line-clamp-1"
              />
              <Suspense
                fallback={<Loader className="animate-spin mx-auto size-4" />}
              >
                <SheetDownloadLink
                  key={item.sheets?.id!}
                  sheetId={item.sheets?.id!}
                />
              </Suspense>
            </div>
          );
        })}
      </div>
    </div>
  );
}
