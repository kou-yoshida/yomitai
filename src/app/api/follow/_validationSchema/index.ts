import { z } from "zod";
export const postFollowParamsSchema = z.object({
  userId: z.string(),
});

export const deleteFollowParamsSchema = z.object({
  userId: z.string(),
});
