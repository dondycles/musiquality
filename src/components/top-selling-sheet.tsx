"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import { useQuery } from "@tanstack/react-query";
import getSheets from "@/actions/get-sheets";
import { Flame } from "lucide-react";
import { usePagePreferences } from "../../store";
import Loader from "./loader";
import PageViewToggleBtn from "./page-view-toggle-btn";
import SheetsDisplayer from "./sheet/sheets-displayer";

export default function TopSellingSheets() {
  const { data: sheets, isLoading: loadingSheets } = useQuery({
    queryFn: async () => {
      const { data } = await getSheets();
      return data;
    },
    queryKey: ["sheets"],
  });
  const pagePreferences = usePagePreferences();

  if (loadingSheets)
    return (
      <Loader className="h-fit w-full p-4 flex justify-center items-center">
        <div className="grid grid-cols-[24px,1fr] gap-1 text-muted-foreground">
          <Flame size={24} className="m-auto" />
          <p className="my-auto">Top Selling Sheets</p>
        </div>
      </Loader>
    );
  return (
    <Card className="shadow-none border-none">
      <CardHeader className="p-0">
        <CardTitle className="flex justify-between">
          <div className="grid grid-cols-[24px,1fr] gap-1">
            <Flame size={24} className="m-auto" />
            <p className="my-auto">Top Selling Sheets</p>
          </div>
          <PageViewToggleBtn
            view={pagePreferences.topSellingSheetsView}
            action={() => pagePreferences.setTopSellingSheetsView()}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-3 mt-3">
        <SheetsDisplayer
          view={pagePreferences.topSellingSheetsView}
          sheets={
            sheets?.flatMap((sheets) => ({
              ...sheets,
              sheets_url: null,
            }))!
          }
        />
      </CardContent>
    </Card>
  );
}
