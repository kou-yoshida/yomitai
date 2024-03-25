import { z } from "zod";
import { ValidationError } from "../errors/ValidationError";
/**
 * zodを使用したリクエストのバリデーションのラッパー
 */
export const validate = async <T extends z.ZodRawShape>(
  validationSchema: z.ZodObject<T>,
  request: Request
) => {
  const body = await request.json();
  const result = validationSchema.safeParse(body);
  if (!result.success) throw new ValidationError();
  return result.data;
};
