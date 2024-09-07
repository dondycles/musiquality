import { SheetData } from "@/types/sheet-data";

export const chunkArray = (array: SheetData[], size: number) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
