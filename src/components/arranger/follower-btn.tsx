"use client";

import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import followArranger from "@/actions/follow-arranger";
import { useQueryClient } from "@tanstack/react-query";
import unfollowArranger from "@/actions/unfollow-arranger";
import { useState } from "react";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";
import revalidate from "@/actions/revalidate-path";

export default function ArrangerFollowBtn({
  arranger_id,
  followed,
  user_id,
  className,
  path,
}: {
  arranger_id: string;
  followed: boolean;
  user_id: string;
  className?: ClassNameValue;
  path?: string;
}) {
  const [disable, setDisable] = useState(false);
  const queryClient = useQueryClient();
  const handleFollow = async () => {
    setDisable(true);
    if (followed) {
      const { error } = await unfollowArranger(arranger_id);
      if (error) return console.log(error);
    } else {
      const { error } = await followArranger(arranger_id);
      if (error) return console.log(error);
    }
    queryClient.invalidateQueries({
      queryKey: ["user", user_id],
    });

    if (path) await revalidate(path);
    else {
      queryClient.invalidateQueries({
        queryKey: ["top-arrangers"],
      });
    }
    setTimeout(() => {
      setDisable(false);
    }, 2500);
  };

  return (
    <Button
      disabled={disable}
      onClick={handleFollow}
      variant={"ghost"}
      size={"icon"}
      className={cn("ml-auto mr-0 shrink-0", className)}
    >
      <Heart size={16} className={`${followed && "fill-red-500"}`} />
    </Button>
  );
}
