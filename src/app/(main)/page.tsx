import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import "@react-pdf-viewer/core/lib/styles/index.css";
import TopSellingSheets from "@/components/top-selling-sheet";
import TopArrangers from "@/components/top-arrangers";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Input
        className="shadow-none"
        placeholder="Search for piece/artist/arranger"
      />
      <TopSellingSheets />
      <Separator />
      <TopArrangers />
    </div>
  );
}
