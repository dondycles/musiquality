import { Database } from "../../database.types";

export type SheetData = Database["public"]["Tables"]["sheets"]["Row"] & {
  users: {
    id: Database["public"]["Tables"]["users"]["Row"]["id"];
    arranger_metadata: Database["public"]["Tables"]["arranger_metadata"]["Row"][];
  } | null;
};
