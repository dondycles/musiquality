"use client";
import { UserDataTypes } from "@/actions/get-user";
import SheetCard from "@/components/sheet/sheet-card";
import { usePagePreferences } from "../../../../store";
import PageViewToggleBtn from "@/components/page-view-toggle-btn";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { chunkArray } from "@/lib/chunkArray";
import SheetBar from "@/components/sheet/sheet-bar";
import ListViewer from "@/components/list-viewer";
import SheetsDisplayer from "@/components/sheet/sheets-displayer";
import { SheetData } from "@/types/sheet-data";
export default function LibrarySheets({
  userData,
}: {
  userData: UserDataTypes;
}) {
  const pagePreferences = usePagePreferences();

  const sheets = userData.library.flatMap((lib) => lib.sheets!);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          Purchased Sheets ({userData.library.length})
        </p>
        <PageViewToggleBtn
          action={() => pagePreferences.setLibrarySheetsView()}
          view={pagePreferences.librarySheetsView}
        />
      </div>
      <SheetsDisplayer
        sheets={sheets}
        view={pagePreferences.librarySheetsView}
      />
    </div>
  );
}
