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
import SheetCard from "./sheet-card";
import { Button } from "./ui/button";
import { Columns3, Flame, Rows3 } from "lucide-react";
import { useState } from "react";
import SheetBar from "./sheet-bar";
import { motion } from "framer-motion";
export default function TopSellingSheets() {
  const { data: sheets, isLoading: loadingSheets } = useQuery({
    queryFn: async () => {
      const { data } = await getSheets();
      return data;
    },
    queryKey: ["sheets"],
  });
  const [view, setView] = useState<"row" | "col">("row");
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
            onClick={() => setView((prev) => (prev === "col" ? "row" : "col"))}
            size={"icon"}
            variant={"ghost"}
          >
            {view === "col" && (
              <motion.div
                key={"col"}
                initial={{ rotate: 90, scale: 0.75 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: -90, scale: 0.75 }}
              >
                <Rows3 size={16} />
              </motion.div>
            )}

            {view === "row" && (
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
      <CardContent className="p-0 mt-3">
        {view === "row" && (
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: 1,
              dragFree: true,
            }}
          >
            <CarouselContent>
              {sheets?.map((sheet) => (
                <CarouselItem key={sheet.id} className="basis-[1/1]">
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
        {view === "col" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-5 w-full h-fit gap-2">
            {sheets?.map((sheet) => (
              <SheetBar sheet={sheet} key={sheet.id} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
