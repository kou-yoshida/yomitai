import { z } from "zod";
export const getFollowersParamsSchema = z.object({
  userId: z.string(),
  page: z.number(),
  limit: z.number(),
});
