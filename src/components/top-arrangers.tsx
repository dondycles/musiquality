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
import ArrangerCard from "./arranger/card";
import GridViewer from "./list-viewer";
import Loader from "./loader";
import { useContext } from "react";
import { UserDataContext } from "./user-data-provider";
import PageViewToggleBtn from "./page-view-toggle-btn";
export default function TopArrangers() {
  const pagePreferences = usePagePreferences();
  const { isLoading, userData } = useContext(UserDataContext);

  const { data: arrangers, isLoading: loadingArrangers } = useQuery({
    queryKey: ["top-arrangers"],
    queryFn: async () => {
      const { success } = await getTopArrangers();
      return success ?? [];
    },
  });
  if (loadingArrangers || isLoading)
    return (
      <Loader className="h-fit w-full p-4 flex justify-center items-center">
        <div className="grid grid-cols-[24px,1fr] gap-1 text-muted-foreground">
          <Flame size={24} className="m-auto" />
          <p className="my-auto">Top Arrangers</p>
        </div>
      </Loader>
    );

  return (
    <Card className="shadow-none border-none">
      <CardHeader className="p-0">
        <CardTitle className="flex justify-between">
          <div className="grid grid-cols-[24px,1fr] gap-1">
            <Flame size={24} className="m-auto" />
            <p className="my-auto">Top Arrangers</p>
          </div>
          <PageViewToggleBtn
            view={pagePreferences.topArrangersView}
            action={() => pagePreferences.setTopArrangersView()}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-3 mt-3">
        {pagePreferences.topArrangersView === "col" && (
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: 1,
              dragFree: true,
            }}
          >
            <CarouselContent>
              {arrangers?.map((arranger) => (
                <CarouselItem
                  key={arranger.id}
                  className="w-fit min-w-fit max-w-fit"
                >
                  <ArrangerCard current_user={userData} arranger={arranger} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex gap-4 items-center justify-center mt-3">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        )}

        {pagePreferences.topArrangersView === "row" && (
          <GridViewer length={arrangers?.length!}>
            {arrangers?.map((arranger) => (
              <ArrangerBar
                current_user={userData}
                arranger={arranger}
                key={arranger.id}
              />
            ))}
          </GridViewer>
        )}
      </CardContent>
    </Card>
  );
}
