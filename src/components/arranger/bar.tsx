import ArrangerBadges from "./badges";
import Link from "next/link";
import ArrangerAvatar from "./avatar";
import { TopArrangerItemType } from "@/actions/get-top-arrangers";
import ArrangerFollowBtn from "./follower-btn";
import { UserDataTypes } from "@/actions/get-user";
import { getIsFollowed } from "@/lib/getIsFollowed";

export default function ArrangerBar({
  arranger,
  current_user,
}: {
  arranger: TopArrangerItemType;
  current_user: UserDataTypes | null;
}) {
  const isFollowed = getIsFollowed(current_user, arranger.user_id);

  return (
    <div className="col-span-1 row-span-1 p-2 flex items-center gap-2">
      <ArrangerAvatar
        arranger={arranger.user_id}
        className="size-12"
        url={arranger.avatar_url}
      />
      <div className="grid gap-1">
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
  );
}
