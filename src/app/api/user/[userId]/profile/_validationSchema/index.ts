import { z } from "zod";
/**
 * profile取得APIのリクエストボディのバリデーションスキーマ
 */
export const getProfileByUserIdParamsSchema = z.object({ userId: z.string() });
