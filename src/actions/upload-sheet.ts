"use server";

import { uploadSheetSchema } from "@/app/(arranger)/arrangers-dashboard/_forms/upload-sheet-form";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export default async function uploadSheet(
  data: z.infer<typeof uploadSheetSchema>
) {
  const supabase = createClient();
  const { error: sheetError, data: sheetData } = await supabase
    .from("sheets")
    .insert({
      title: data.title,
      original_artist: data.original_artist,
      instrument: data.instrument,
      difficulty: data.difficulty,
      thumbnail_url: data.thumbnail_url,
      with_chords: data.with_chords,
      with_lyrics: data.with_lyrics,
      price: data.price,
    })
    .select("id")
    .single();
  if (sheetError) {
    return { error: sheetError.message };
  }
  const { error: sheetUrlError } = await supabase.from("sheets_url").insert({
    sheet: sheetData.id,
    url: data.sheet_url,
  });
  if (sheetUrlError) {
    await supabase.from("sheets").delete().eq("id", sheetData.id);
    return { error: sheetUrlError.message };
  }

  return { success: sheetData.id };
}
