import { z } from "zod";

export const getFollowingTimelineParamsSchema = z.object({
  page: z.number(),
  limit: z.number(),
});
