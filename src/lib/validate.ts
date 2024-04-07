import { z } from "zod";
import { ValidationError } from "../errors/ValidationError";
/**
 * zodを使用したリクエストのバリデーションのラッパー
 */
export const validate = async <T extends z.ZodRawShape>(
  validationSchema: z.ZodObject<T>,
  input: Record<string, any>
) => {
  const result = validationSchema.safeParse(input);
  if (!result.success) throw new ValidationError();
  return result.data;
};
