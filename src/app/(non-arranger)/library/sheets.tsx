import { UserData } from "@/types/user-data";

export default function LibrarySheets({ userData }: { userData: UserData }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground">Sheets</p>
      <div className="flex flex-col gap-1">
        {userData.library.map((sheet) => {
          return (
            <div key={sheet.id}>
              <p>{sheet.id}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
