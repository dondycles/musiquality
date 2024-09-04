import getSheetUrl from "@/actions/get-sheet-url";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function SheetDownloadLink({
  sheetId,
}: {
  sheetId: number;
}) {
  const { success } = await getSheetUrl(sheetId);

  if (success)
    return (
      <Button asChild>
        <Link href={success} download={"sheet.pdf"}>
          View
        </Link>
      </Button>
    );
}
