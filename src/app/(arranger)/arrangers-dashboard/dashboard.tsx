"use client";

import getUser from "@/actions/getuser";
import { useQuery } from "@tanstack/react-query";
import ArrangerBasicInfoCard from "./arranger-basic-info-card";
import TabsSection from "./tabs-section";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Dashboard() {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => await getUser(),
    enabled: userId !== null,
  });

  useEffect(() => {
    async function _setUserId() {
      const id = (await supabase.auth.getUser()).data.user?.id;
      if (!id) return setUserId(null);
      setUserId(id);
    }
    _setUserId();
  }, [supabase]);

  if (userLoading) return;
  if (userData?.success)
    return (
      <>
        <ArrangerBasicInfoCard userData={userData.success} />
        <TabsSection userData={userData.success} />
      </>
    );
}
