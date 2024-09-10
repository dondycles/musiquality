import { Separator } from "@/components/ui/separator";
import TopSellingSheets from "@/components/top-selling-sheet";
import TopArrangers from "@/components/top-arrangers";
import SearchBar from "@/components/search-bar";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 px-4 lg:px-40 xl:px-64">
      <Suspense>
        <SearchBar />
      </Suspense>
      <TopSellingSheets />
      <Separator />
      <TopArrangers />
    </div>
  );
}
