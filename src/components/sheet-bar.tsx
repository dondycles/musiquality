import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SheetData } from "@/types/sheet-data";
import SheetOGArtistText, { original_artist } from "./sheet-og-artists-text";
import AddToCartBtn from "./add-to-cart-btn";

export default function SheetBar({ sheet }: { sheet: SheetData }) {
  return (
    <div className="bg-muted rounded-md col-span-1 row-span-1 p-2 flex items-center gap-2">
      <Avatar className="size-12">
        <AvatarImage
          src={sheet.users?.arranger_metadata?.avatar_url ?? "/favicon.ico"}
          alt={sheet.users?.arranger_metadata?.display_name}
        />
        <AvatarFallback className="font-gloock">MQ</AvatarFallback>
      </Avatar>
      <div className="grid">
        <p className="truncate font-semibold text-sm">{sheet.title}</p>
        <SheetOGArtistText artists={sheet.original_artist as original_artist} />
      </div>
      <AddToCartBtn
        branded={false}
        containerClassName="w-fit my-auto ml-auto mr-0"
        textClassName="text-sm sm:text-sm md:text-base"
        sheet={sheet}
      />
    </div>
  );
}
