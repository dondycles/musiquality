import { z } from "zod";

export const instrumentsSchema = z.array(z.string());
