import { z } from "zod";
export const getFollowingsParamsSchema = z.object({
  page: z.number(),
  limit: z.number(),
});
