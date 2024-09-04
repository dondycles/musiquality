import { type User } from "@supabase/supabase-js";
import { type Database } from "@/../../database.types";
export type UserData = User &
  Database["public"]["Tables"]["users"]["Row"] & {
    arranger_metadata: Database["public"]["Tables"]["arranger_metadata"]["Row"][];
  } & { library: Database["public"]["Tables"]["library"]["Row"][] } & {
    transactions: Database["public"]["Tables"]["transactions"]["Row"][];
  };
