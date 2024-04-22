import { z } from "zod";
export const getFollowersParamsSchema = z.object({
  page: z.number(),
  limit: z.number(),
});
