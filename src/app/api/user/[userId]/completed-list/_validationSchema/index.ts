import { z } from "zod";
/**
 * task-list取得APIのリクエストボディのバリデーションスキーマ
 */
export const getCompletedTodoListByUserIdParamsSchema = z.object({
  userId: z.string(),
  tagIds: z.array(z.string()),
  page: z.number(),
  limit: z.number(),
});
