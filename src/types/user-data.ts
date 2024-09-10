import { z } from "zod";

export const userDataSchema = z.object({
  name: z.string().min(1),
  avatar_url: z.string().url(),
});
