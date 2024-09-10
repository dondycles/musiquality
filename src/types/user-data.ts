import { z } from "zod";

// const userData: UserData = {};
// userData.arranger_metadata.
export const userDataSchema = z.object({
  name: z.string().min(1),
  avatar_url: z.string().url(),
});
