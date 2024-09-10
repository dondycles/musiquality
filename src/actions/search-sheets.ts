"use server";

import { SheetData } from "@/types/sheet-data";
import { createClient } from "@/utils/supabase/server";
import getSheet from "./get-sheet";

export default async function searchSheets(term: string) {
  const supabase = createClient();

  const { data: sheets, error: sheetsError } = await supabase.rpc(
    "search_sheets_by_term",
    {
      search_text: term,
    }
  );

  if (sheetsError) return { error: sheetsError.message };

  const getSheetsData = async () => {
    const newData: SheetData[] = [];
    if (!sheets) return [];
    for (const sheet of sheets) {
      const { data } = await getSheet(sheet);
      if (data) newData.push(data);
    }
    return newData ?? [];
  };

  const newSheetsData = await getSheetsData();

  return { success: newSheetsData ?? [] };
}
