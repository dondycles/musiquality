"use client";
import { UserDataTypes } from "@/actions/get-user";
import { usePagePreferences } from "../../../../store";
import PageViewToggleBtn from "@/components/page-view-toggle-btn";

import SheetsDisplayer from "@/components/sheet/sheets-displayer";
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
