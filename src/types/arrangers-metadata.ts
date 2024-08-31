import { z } from "zod";

export const arrangersMetadataSchema = z.object({
  display_name: z.string(),
  avatar_url: z.string(),
  description: z.string(),
});
