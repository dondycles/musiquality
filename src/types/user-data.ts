import { type User } from "@supabase/supabase-js";
import { type Database } from "@/../../database.types";

export type UserData = User &
  Database["public"]["Tables"]["users"]["Row"] & {
    arranger_metadata:
      | Database["public"]["Tables"]["arranger_metadata"]["Row"]
      | null
      | undefined; // matches arranger_metadata(*)
  } & {
    transactions: Array<
      Database["public"]["Tables"]["transactions"]["Row"] & {
        library: Array<
          Database["public"]["Tables"]["library"]["Row"] & {
            sheets:
              | (Database["public"]["Tables"]["sheets"]["Row"] & {
                  sheets_url:
                    | Database["public"]["Tables"]["sheets_url"]["Row"]
                    | null
                    | undefined;
                })
              | null
              | undefined;
          }
        >;
      }
    >;
    library: Array<
      Database["public"]["Tables"]["library"]["Row"] & {
        sheets:
          | (Database["public"]["Tables"]["sheets"]["Row"] & {
              sheets_url:
                | Database["public"]["Tables"]["sheets_url"]["Row"]
                | null
                | undefined;
            })
          | null
          | undefined;
      }
    >;
    sheets: Database["public"]["Tables"]["sheets"]["Row"][];
  };

// const userData : UserData = {}
//   {userData.library.map((item) => item.sheets?.sheets_url?.url)}
