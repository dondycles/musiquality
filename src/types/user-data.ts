import { type User } from "@supabase/supabase-js";
import { type Database } from "@/../../database.types";
import { SheetData } from "./sheet-data";

// *, arranger_metadata(*), library(*, sheets(*)), transactions(*)
// export type UserData = User &
//   Database["public"]["Tables"]["users"]["Row"] & {
//     arranger_metadata: Database["public"]["Tables"]["arranger_metadata"]["Row"][]; // matches arranger_metadata(*)
//   } & {
//     library: Array<
//       Database["public"]["Tables"]["library"]["Row"] & {
//         // matches library(*)
//         sheets:
//           | (Database["public"]["Tables"]["sheets"]["Row"] & {
//               sheets_url:
//                 | Database["public"]["Tables"]["sheets_url"]["Row"]
//                 | null;
//             })
//           | null; // matches sheets(*)
//       }
//     >;
//   } & {
//     transactions: Database["public"]["Tables"]["transactions"]["Row"][]; // matches transactions(*)
//   };
// "*, arranger_metadata(*), sheets_url(*, sheets(*,users(*, arranger_metadata(*)))), transactions(*)"
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
  };

// const userData : UserData = {}
//   {userData.library.map((item) => item.sheets?.sheets_url?.url)}
