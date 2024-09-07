"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useQuery } from "@tanstack/react-query";
import getSheets from "@/actions/get-sheets";
import { Skeleton } from "./ui/skeleton";
import SheetCard from "./sheet/sheet-card";
import { Button } from "./ui/button";
import { Columns3, Flame, Rows3 } from "lucide-react";
import SheetBar from "./sheet/sheet-bar";
import { motion } from "framer-motion";
import { usePagePreferences } from "../../store";
import GridViewer from "./list-viewer";
import { chunkArray } from "@/lib/chunkArray";

export default function TopSellingSheets() {
  const { data: sheets, isLoading: loadingSheets } = useQuery({
    queryFn: async () => {
      const { data } = await getSheets();
      return data;
    },
    queryKey: ["sheets"],
  });
  const pagePreferences = usePagePreferences();

  if (loadingSheets) return <Skeleton className="h-32 w-full" />;
  return (
    <Card className="shadow-none border-none">
      <CardHeader className="p-0">
        <CardTitle className="flex justify-between">
          <div className="grid grid-cols-[24px,1fr] gap-1">
            <Flame size={24} className="m-auto" />
            <p className="my-auto">Top Selling Sheets</p>
          </div>
          <Button
            onClick={() => pagePreferences.setTopSellingSheetsView()}
            size={"icon"}
            variant={"ghost"}
          >
            {pagePreferences.topSellingSheetsView === "col" && (
              <motion.div
                key={"col"}
                initial={{ rotate: 90, scale: 0.75 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: -90, scale: 0.75 }}
              >
                <Rows3 size={16} />
              </motion.div>
            )}

            {pagePreferences.topSellingSheetsView === "row" && (
              <motion.div
                key={"row"}
                initial={{ rotate: 90, scale: 0.75 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: -90, scale: 0.75 }}
              >
                <Columns3 size={16} />
              </motion.div>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-3 mt-3">
        {pagePreferences.topSellingSheetsView === "col" && (
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: 1,
              dragFree: true,
            }}
          >
            <CarouselContent>
              {sheets?.map((sheet) => (
                <CarouselItem
                  key={sheet.id}
                  className="max-w-fit w-fit min-w-fit"
                >
                  <SheetCard sheet={sheet} key={sheet.id} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex gap-4 items-center justify-center mt-3">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        )}
        {pagePreferences.topSellingSheetsView === "row" && (
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: 1,
              dragFree: true,
            }}
          >
            <CarouselContent>
              {sheets &&
                chunkArray(sheets, 10).map((sheet, index) => {
                  return (
                    <CarouselItem
                      key={`chunked-top-selling-${index}`}
                      className="basis-full"
                    >
                      <GridViewer length={sheet.length}>
                        {sheet.map((sheet) => (
                          <SheetBar sheet={sheet} key={sheet.id} />
                        ))}
                      </GridViewer>
                    </CarouselItem>
                  );
                })}
            </CarouselContent>
            <div className="flex gap-4 items-center justify-center mt-3">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        )}
      </CardContent>
    </Card>
  );
}
