"use server";

import { SheetData } from "@/types/sheet-data";
import { createClient } from "@/utils/supabase/server";
import getSheet from "./get-sheet";

export default async function searchSheets(term: string) {
  const supabase = createClient();

  const { data: sheetsByTitle, error: sheetsByTitleError } = await supabase
    .from("sheets")
    .select("*, users(id, arranger_metadata(*))")
    .ilike("title", `%${term}%`);

  if (sheetsByTitleError)
    return { error: sheetsByTitleError.message, success: [] };

  const { data: sheetsByArtist, error: sheetsByArtistError } =
    await supabase.rpc("search_sheets_by_artist", {
      search_text: term,
    });

  if (sheetsByArtistError)
    return { error: sheetsByArtistError.message, success: [] };

  const getSheetByArtist = async () => {
    const newData: SheetData[] = [];
    if (!sheetsByArtist) return [];
    for (const sheet of sheetsByArtist) {
      const { data } = await getSheet(sheet.id);
      if (data) newData.push(data);
    }
    return newData;
  };
  const sheets = [...(sheetsByTitle ?? []), ...(await getSheetByArtist())];
  return { success: sheets };
}
