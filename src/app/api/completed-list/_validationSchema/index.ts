import { z } from "zod";
/**
 * task-list取得APIのリクエストボディのバリデーションスキーマ
 */
export const getCompletedTodoListParamsSchema = z.object({
  tagIds: z.array(z.string()),
  page: z.number(),
  limit: z.number(),
});
