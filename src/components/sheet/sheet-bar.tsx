import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SheetData } from "@/types/sheet-data";
import SheetOGArtistText, { original_artist } from "./sheet-og-artists-text";
import AddToCartBtn from "../add-to-cart-btn";
import Link from "next/link";
import Head from "next/head";

export default function SheetBar({ sheet }: { sheet: SheetData }) {
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
      <div className="col-span-1 row-span-1 p-2 flex items-center gap-2 cursor-pointer">
        <Link href={`/arranger/${sheet.users?.arranger_metadata?.user_id}`}>
          <Avatar className="size-12">
            <AvatarImage
              src={sheet.users?.arranger_metadata?.avatar_url ?? "/favicon.ico"}
              alt={sheet.users?.arranger_metadata?.display_name}
            />
            <AvatarFallback className="font-gloock">MQ</AvatarFallback>
          </Avatar>
        </Link>
        <div className="grid">
          <Link className="truncate text-sm" href={`/sheet/${sheet.id}`}>
            {sheet.title}
          </Link>
          <SheetOGArtistText
            className="text-xs"
            artists={sheet.og_artists_array!}
          />
        </div>
        <AddToCartBtn
          key={sheet.id}
          branded={false}
          containerClassName="w-fit my-auto ml-auto mr-0"
          textClassName="text-sm sm:text-sm md:text-base"
          sheet={sheet}
        />
      </div>
    </>
  );
}
