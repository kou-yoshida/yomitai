import { z } from "zod";

export const getTagsByUserIdParamsSchema = z.object({
  page: z.number(),
  limit: z.number(),
  userId: z.string(),
});
