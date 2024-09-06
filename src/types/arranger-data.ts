import { Database } from "../../database.types";
import { SheetData } from "./sheet-data";

export type ArrangerData =
  Database["public"]["Tables"]["arranger_metadata"]["Row"] & {
    users: {
      id: Database["public"]["Tables"]["users"]["Row"]["id"];
      sheets: Pick<Database["public"]["Tables"]["sheets"]["Row"], "id">[];
    } | null;
  };

export type SingleArrangerData =
  Database["public"]["Tables"]["arranger_metadata"]["Row"] & {
    sheets: Database["public"]["Tables"]["sheets"]["Row"][];
  };
