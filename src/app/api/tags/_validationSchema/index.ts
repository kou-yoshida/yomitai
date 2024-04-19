import { z } from "zod";

export const getTagsParamsSchema = z.object({
  page: z.number(),
  limit: z.number(),
});
