import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import TopSellingSheets from "@/components/top-selling-sheet";
import TopArrangers from "@/components/top-arrangers";
import SearchBar from "@/components/search-bar";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 px-4 lg:px-40 xl:px-64">
      <SearchBar />
      <TopSellingSheets />
      <Separator />
      <TopArrangers />
    </div>
  );
}
