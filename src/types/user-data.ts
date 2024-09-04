import { type User } from "@supabase/supabase-js";
import { type Database } from "@/../../database.types";

// *, arranger_metadata(*), library(*, sheets(*)), transactions(*)
export type UserData = User &
  Database["public"]["Tables"]["users"]["Row"] & {
    arranger_metadata: Database["public"]["Tables"]["arranger_metadata"]["Row"][]; // matches arranger_metadata(*)
  } & {
    library: Array<
      Database["public"]["Tables"]["library"]["Row"] & {
        // matches library(*)
        sheets: Database["public"]["Tables"]["sheets"]["Row"] | null; // matches sheets(*)
      }
    >;
  } & {
    transactions: Database["public"]["Tables"]["transactions"]["Row"][]; // matches transactions(*)
  };
