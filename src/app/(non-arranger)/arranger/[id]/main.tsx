"use client";
import { SingleArrangerDataTypes } from "@/actions/get-one-arranger";
import ArrangerAvatar from "@/components/arranger/avatar";
import ArrangerBadges from "@/components/arranger/badges";
import ArrangerFollowBtn from "@/components/arranger/follower-btn";
import BrandedText from "@/components/branded-text";
import ListViewer from "@/components/list-viewer";
import SheetBar from "@/components/sheet/sheet-bar";
import { UserDataContext } from "@/components/user-data-provider";
import { getIsFollowed } from "@/lib/getIsFollowed";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export default function ArrangerMain({
  arranger,
}: {
  arranger: SingleArrangerDataTypes;
}) {
  const { userData, isLoading } = useContext(UserDataContext);
  const isFollowed = getIsFollowed(userData, arranger.user_id);
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-4 px-4 lg:px-40 xl:px-64">
      <div className="flex flex-col xs:flex-row gap-4 justify-center">
        <ArrangerAvatar
          className="size-32 rounded-md"
          arranger={arranger.user_id}
          url={arranger.avatar_url}
        />
        <div className="flex flex-col gap-2 justify-center">
          <BrandedText className="truncate" text={arranger.display_name} />
          <ArrangerBadges
            followers={arranger.arranger_followers.length}
            sheets={arranger.sheets.length}
          />
          {!isLoading && userData && userData.id !== arranger.user_id && (
            <ArrangerFollowBtn
              followed={isFollowed}
              user_id={userData.id}
              arranger_id={arranger.user_id}
              className="m-0"
              path={pathname}
            />
          )}
        </div>
      </div>
      <ListViewer length={arranger.sheets.length}>
        {arranger.sheets.map((sheet) => {
          return (
            <SheetBar
              key={sheet.id}
              sheet={{ ...sheet, arranger_metadata: arranger }}
            />
          );
        })}
      </ListViewer>
    </div>
  );
}
