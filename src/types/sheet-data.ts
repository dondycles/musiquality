import { Database } from "../../database.types";

export type SheetData = Database["public"]["Tables"]["sheets"]["Row"] & {
  arranger_metadata:
    | Database["public"]["Tables"]["arranger_metadata"]["Row"]
    | null
    | undefined;
} & {
  sheets_url:
    | Database["public"]["Tables"]["sheets_url"]["Row"]
    | null
    | undefined;
};
