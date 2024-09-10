import ArrangerAvatar from "./avatar";
import ArrangerBadges from "./badges";
import Link from "next/link";
import { Metadata } from "next";
import { TopArrangerItemType } from "@/actions/get-top-arrangers";
import ArrangerFollowBtn from "./follower-btn";
import { UserDataTypes } from "@/actions/get-user";
import { getIsFollowed } from "@/lib/getIsFollowed";

export const metadata: Metadata = {
  title: "My Page Title",
};

export default function ArrangerCard({
  arranger,
  current_user,
}: {
  arranger: TopArrangerItemType;
  current_user: UserDataTypes | null;
}) {
  const isFollowed = getIsFollowed(current_user, arranger.user_id);

  return (
    <div className="h-full w-48 border rounded-md flex flex-col gap-2 p-1 sm:p-4">
      <ArrangerAvatar
        arranger={arranger.user_id}
        className="w-full h-auto aspect-square rounded-md"
        url={arranger.avatar_url ?? "/favicon.ico"}
      />
      <div className="flex flex-row items-center gap-2">
        <div className="mb-0 mt-auto w-full overflow-auto flex flex-col gap-2">
          <Link
            href={`/arranger/${arranger.user_id}`}
            className="truncate text-sm"
          >
            {arranger.display_name}
          </Link>
          <ArrangerBadges
            className="truncate"
            followers={arranger.arranger_followers.length}
            sheets={arranger.sheets.length}
          />
        </div>
        {current_user ? (
          current_user.id !== arranger.user_id ? (
            <ArrangerFollowBtn
              followed={isFollowed}
              arranger_id={arranger.user_id}
              user_id={current_user.id}
            />
          ) : null
        ) : null}
      </div>
    </div>
  );
}
