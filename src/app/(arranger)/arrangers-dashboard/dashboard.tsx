"use client";

import ArrangerBasicInfoCard from "./arranger-basic-info-card";
import TabsSection from "./tabs-section";
import { useContext } from "react";
import { UserDataContext } from "@/components/user-data-provider";

export default function Dashboard() {
  const { isLoading: userLoading, userData } = useContext(UserDataContext);

  if (userLoading) return;
  if (userData)
    return (
      <div className="flex flex-col gap-4 px-4 lg:px-40 xl:px-64">
        <ArrangerBasicInfoCard userData={userData} />
        <TabsSection userData={userData} />
      </div>
    );
}
