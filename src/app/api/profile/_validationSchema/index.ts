import { z } from "zod";
/**
 * プロフィール更新リクエストのバリデーションスキーマ
 */
export const putProfileRequestSchema = z.object({
  githubUrl: z.string().optional(),
  zennUrl: z.string().optional(),
  quitaUrl: z.string().optional(),
  isPrivate: z.boolean(),
});
