import { z } from "zod";
/**
 * task-list取得APIのリクエストボディのバリデーションスキーマ
 */
export const getSuspendedTodoListByUserIdParamsSchema = z.object({
  tagIds: z.array(z.string()),
  page: z.number(),
  limit: z.number(),
});
