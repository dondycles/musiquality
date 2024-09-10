import { UserDataTypes } from "@/actions/get-user";

export const getIsFollowed = (
  userData: UserDataTypes | null,
  arranger_id: string
): boolean => {
  if (!userData) return false;
  const isFollowed = userData.arranger_followers.find(
    (ar) => ar.arranger_metadata?.user_id === arranger_id
  );

  return isFollowed !== undefined;
};
