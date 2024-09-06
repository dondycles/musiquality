"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import ArrangerBar from "./arranger/bar";
import { Columns3, Flame, Rows3 } from "lucide-react";
import { usePagePreferences } from "../../store";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useQuery } from "@tanstack/react-query";
import getTopArrangers from "@/actions/get-top-arrangers";
import { Skeleton } from "./ui/skeleton";
import ArrangerCard from "./arranger/card";
import GridViewer from "./grid-viewer";
export default function TopArrangers() {
  const pagePreferences = usePagePreferences();

  const { data: arrangers, isLoading: loadingArrangers } = useQuery({
    queryKey: ["top-arrangers"],
    queryFn: async () => {
      const { success } = await getTopArrangers();
      return success ?? [];
    },
  });
  if (loadingArrangers) return <Skeleton className="h-32 w-full" />;

  return (
    <Card className="shadow-none border-none">
      <CardHeader className="p-0">
        <CardTitle className="flex justify-between">
          <div className="grid grid-cols-[24px,1fr] gap-1">
            <Flame size={24} className="m-auto" />
            <p className="my-auto">Top Arrangers</p>
          </div>
          <Button
            onClick={() => pagePreferences.setTopArrangersView()}
            size={"icon"}
            variant={"ghost"}
          >
            {pagePreferences.topArrangersView === "col" && (
              <motion.div
                key={"col"}
                initial={{ rotate: 90, scale: 0.75 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: -90, scale: 0.75 }}
              >
                <Rows3 size={16} />
              </motion.div>
            )}

            {pagePreferences.topArrangersView === "row" && (
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
        {pagePreferences.topArrangersView === "col" && (
          <div>
            <Carousel
              opts={{
                align: "start",
                slidesToScroll: 1,
                dragFree: true,
              }}
            >
              <CarouselContent>
                {arrangers?.map((arranger) => (
                  <CarouselItem key={arranger.id} className="basis-[1/1]">
                    <ArrangerCard arranger={arranger} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex gap-4 items-center justify-center mt-3">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>
        )}

        {pagePreferences.topArrangersView === "row" && (
          <GridViewer>
            {arrangers?.map((arranger) => (
              <ArrangerBar arranger={arranger} key={arranger.id} />
            ))}
          </GridViewer>
        )}
      </CardContent>
    </Card>
  );
}
