import { z } from "zod";

export const createTagSchema = z.object({
  name: z.string().min(1).max(255),
});

export const updateTagSchema = z.object({
  tagId: z.string(),
  name: z.string().min(1).max(255),
});

export const deleteTagSchema = z.object({
  tagId: z.string(),
});
