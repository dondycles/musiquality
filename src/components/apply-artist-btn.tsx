"use client";
import { useContext } from "react";
import { Button } from "./ui/button";
import { UserDataContext } from "./user-data-provider";
import applyArtist from "@/actions/apply-artist";
import { useQueryClient } from "@tanstack/react-query";

export default function ApplyArtistBtn({ id }: { id: string }) {
  const { userData, isLoading } = useContext(UserDataContext);
  const queryClient = useQueryClient();
  return (
    <Button
      onClick={async () => {
        if (isLoading || userData?.is_applying || userData?.is_arranger) return;
        await applyArtist(id);
        queryClient.invalidateQueries({
          queryKey: ["user", id],
        });
      }}
      disabled={isLoading || userData?.is_applying || userData?.is_arranger}
      className="w-fit mx-auto"
    >
      {userData?.is_arranger
        ? "Already an arranger"
        : userData?.is_applying
        ? "Applied"
        : "Apply"}
    </Button>
  );
}
