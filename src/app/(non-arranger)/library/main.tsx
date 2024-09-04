"use client";

import getUser from "@/actions/get-user";
import { useQuery } from "@tanstack/react-query";
import Transactions from "./transactions";
import LibrarySheets from "./sheets";
import { Separator } from "@/components/ui/separator";

export default function LibraryMain({ userId }: { userId: string | null }) {
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => await getUser(),
    enabled: userId !== null,
  });
  if (userLoading) return;
  if (user?.success)
    return (
      <div className="flex flex-col gap-4">
        <LibrarySheets userData={user?.success} />
        <Separator />
        <Transactions userData={user?.success} />
      </div>
    );
}
