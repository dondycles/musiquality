import getSheet from "@/actions/get-sheet";
import searchSheets from "@/actions/search-sheets";
import ListViewer from "@/components/list-viewer";
import SearchBar from "@/components/search-bar";
import SheetBar from "@/components/sheet/sheet-bar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { chunkArray } from "@/lib/chunkArray";
import { SheetData } from "@/types/sheet-data";
import { createClient } from "@/utils/supabase/server";
import { Music } from "lucide-react";

export default async function Search({
  searchParams,
}: {
  searchParams: { term: string };
}) {
  const { success: sheets, error } = await searchSheets(searchParams.term);
  if (error)
    return <p className="text-muted-foreground text-sm text-center">{error}</p>;
  return (
    <div className="flex flex-col gap-4 px-4 lg:px-40 xl:px-64">
      <h1 className="text-sm text-muted-foreground text-center">
        Searching for &quot;{searchParams.term}&quot;
      </h1>
      <SearchBar />

      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 1,
          dragFree: true,
        }}
      >
        <CarouselContent className="h-fit min-h-fit ">
          {sheets.length > 0 ? (
            chunkArray(sheets, 10).map((sheet, index) => {
              return (
                <CarouselItem
                  key={`chunked-search-sheet-${index}`}
                  className="basis-full  "
                >
                  <ListViewer length={sheet.length}>
                    {sheet.map((sh) => {
                      return <SheetBar key={sh.id} sheet={sh} />;
                    })}
                  </ListViewer>
                </CarouselItem>
              );
            })
          ) : (
            <CarouselItem className="basis-full  ">
              <p className="text-center text-sm text-muted-foreground">
                No arrangement found
              </p>
            </CarouselItem>
          )}
        </CarouselContent>
        <div className="flex gap-4 items-center justify-center mt-3">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}
