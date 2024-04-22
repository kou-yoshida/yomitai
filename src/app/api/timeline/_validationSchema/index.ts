import { z } from "zod";

export const getTimelineParamsSchema = z.object({
  page: z.number(),
  limit: z.number(),
});
