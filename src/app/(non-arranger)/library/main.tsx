"use client";
import Transactions from "./transactions";
import LibrarySheets from "./sheets";
import { Separator } from "@/components/ui/separator";
import { useContext } from "react";
import { UserDataContext } from "@/components/user-data-provider";

export default function LibraryMain() {
  const { isLoading: userLoading, userData } = useContext(UserDataContext);
  if (userLoading) return;
  if (userData)
    return (
      <div className="flex flex-col gap-4 px-4 lg:px-40 xl:px-64">
        <h1 className="text-center text-sm text-muted-foreground">Library</h1>
        <LibrarySheets userData={userData} />
        <Separator />
        <Transactions userData={userData} />
      </div>
    );
}
