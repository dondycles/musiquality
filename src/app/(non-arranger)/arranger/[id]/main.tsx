"use client";
import ArrangerAvatar from "@/components/arranger/avatar";
import ArrangerBadges from "@/components/arranger/badges";
import BrandedText from "@/components/branded-text";
import GridViewer from "@/components/grid-viewer";
import SheetBar from "@/components/sheet/sheet-bar";
import { SingleArrangerData } from "@/types/arranger-data";

export default function ArrangerMain({
  arranger,
}: {
  arranger: SingleArrangerData;
}) {
  return (
    <div className="flex flex-col gap-4 px-4 lg:px-40 xl:px-64">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <ArrangerAvatar
          className="size-32 rounded-md"
          arranger={arranger.user_id}
          url={arranger.avatar_url}
        />
        <div className="flex flex-col gap-2">
          <BrandedText className="truncate" text={arranger.display_name} />
          <ArrangerBadges sheets={arranger.sheets.length} />
        </div>
      </div>
      <GridViewer>
        {arranger.sheets.map((sheet) => {
          return (
            <SheetBar
              key={sheet.id}
              sheet={{
                ...sheet,
                arranger: arranger.user_id,
                users: { id: arranger.user_id, arranger_metadata: arranger },
              }}
            />
          );
        })}
      </GridViewer>
    </div>
  );
}
