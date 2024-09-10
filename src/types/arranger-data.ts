import { Database } from "../../database.types";
import { SheetData } from "./sheet-data";

export type ArrangerData =
  Database["public"]["Tables"]["arranger_metadata"]["Row"] & {
    sheets: Pick<Database["public"]["Tables"]["sheets"]["Row"], "id">[];
  };

export type SingleArrangerData =
  Database["public"]["Tables"]["arranger_metadata"]["Row"] & {
    sheets: Database["public"]["Tables"]["sheets"]["Row"][];
  };
