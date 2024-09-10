import { type User } from "@supabase/supabase-js";
import { type Database } from "@/../../database.types";
import { SheetData } from "./sheet-data";
import { z } from "zod";

export type UserData = User &
  Database["public"]["Tables"]["users"]["Row"] & {
    arranger_metadata:
      | (Database["public"]["Tables"]["arranger_metadata"]["Row"] & {
          sheets: Database["public"]["Tables"]["sheets"]["Row"][];
        })
      | null
      | undefined;
  } & {
    transactions: Array<
      Database["public"]["Tables"]["transactions"]["Row"] & {
        library: Array<
          Database["public"]["Tables"]["library"]["Row"] & {
            sheets:
              | (SheetData & {
                  sheets_url:
                    | Database["public"]["Tables"]["sheets_url"]["Row"]
                    | null
                    | undefined;
                })
              | null;
          }
        >;
      }
    >;
    library: Array<
      Database["public"]["Tables"]["library"]["Row"] & {
        sheets:
          | (SheetData & {
              sheets_url:
                | Database["public"]["Tables"]["sheets_url"]["Row"]
                | null
                | undefined;
            })
          | null;
      }
    >;
  };

// const userData : UserData = {}
//   {userData.library.map((item) => item.sheets?.sheets_url?.url)}
export const userDataSchema = z.object({
  name: z.string().min(1),
  avatar_url: z.string().url(),
});
