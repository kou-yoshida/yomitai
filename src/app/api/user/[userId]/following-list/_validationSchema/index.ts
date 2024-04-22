import { z } from "zod";
export const getFollowingsParamsSchema = z.object({
  userId: z.string(),
  page: z.number(),
  limit: z.number(),
});
