"use client";

import getUser from "@/actions/getuser";
import { useQuery } from "@tanstack/react-query";
import ArrangerBasicInfoCard from "./arranger-basic-info-card";
import TabsSection from "./tabs-section";

export default function Dashboard() {
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUser(),
  });

  if (userLoading) return;
  if (userData?.success)
    return (
      <>
        <ArrangerBasicInfoCard userData={userData.success} />
        <TabsSection userData={userData.success} />
      </>
    );
}
