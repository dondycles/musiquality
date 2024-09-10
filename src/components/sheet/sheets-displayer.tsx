import { SheetData } from "@/types/sheet-data";
import { View } from "../../../store";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import SheetCard from "./sheet-card";
import SheetBar from "./sheet-bar";
import { chunkArray } from "@/lib/chunkArray";
import ListViewer from "../list-viewer";

export default function SheetsDisplayer({
  view,
  sheets,
}: {
  view: View;
  sheets: SheetData[];
}) {
  return (
    <Carousel
      opts={{
        align: "start",
        slidesToScroll: 1,
        dragFree: true,
      }}
    >
      <CarouselContent>
        {view === "col" &&
          sheets.map((sheet) => (
            <CarouselItem key={sheet.id} className="max-w-fit w-fit min-w-fit">
              <SheetCard sheet={sheet} />
            </CarouselItem>
          ))}
        {view === "row" &&
          chunkArray(sheets, 10).map((sheet, index) => {
            return (
              <CarouselItem key={`chunked-${index}`} className="basis-full">
                <ListViewer length={sheet.length}>
                  {sheet.map((s) => (
                    <SheetBar sheet={s} key={s.id} />
                  ))}
                </ListViewer>
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <div className="flex gap-4 items-center justify-center mt-3">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
