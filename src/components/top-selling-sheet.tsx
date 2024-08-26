"use client";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import SheetCard from "./sheet-cart";
import { useQuery } from "@tanstack/react-query";
import getsheets from "@/actions/getsheets";

export default function TopSellingSheets() {
  const { data: sheets, isLoading: loadingSheets } = useQuery({
    queryKey: ["sheets"],
    queryFn: async () => {
      const { data } = await getsheets();
      return data;
    },
  });
  if (!loadingSheets)
    return (
      <Card className="shadow-none border-none">
        <CardHeader className="p-0">
          <CardTitle className="none">
            <div className="grid grid-cols-[24px,1fr] gap-1">
              <MdOutlineLocalFireDepartment size={24} className="m-auto" />
              <p className="my-auto">Top Selling Sheets</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 mt-3">
          <Carousel
            opts={{
              align: "start",
              skipSnaps: true,
              slidesToScroll: 3,
            }}
            className="basis-1"
          >
            <CarouselContent>
              {sheets?.map((sheet) => (
                <CarouselItem key={sheet.id} className="basis-1/1 max-w-72">
                  <SheetCard sheet={sheet} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex gap-4 items-center justify-center mt-3">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </CardContent>
      </Card>
    );
}
