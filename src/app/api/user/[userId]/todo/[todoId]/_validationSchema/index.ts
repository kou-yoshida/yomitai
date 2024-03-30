import { TODO_STATUS } from "@/src/server/domain/entities/constants/TodoStatus";
import { z } from "zod";

export const getTodoDetailByUserIdRequestSchema = z.object({
  todoId: z.string(),
});
