import SheetCard from "@/components/sheet/sheet-card";
import { UserData } from "@/types/user-data";

export default function LibrarySheets({ userData }: { userData: UserData }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground text-sm">
        Purchased Sheets ({userData.library.length})
      </p>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {userData.library.map((item) => {
          return (
            <SheetCard
              className="w-full"
              sheet={item.sheets!}
              key={item.sheets?.id}
              urlDownload={item.sheets?.sheets_url?.url}
            />
          );
        })}
      </div>
    </div>
  );
}
