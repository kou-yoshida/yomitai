import { TODO_STATUS } from "@/src/server/domain/entities/constants/TodoStatus";
import { z } from "zod";

export const getTodoDetailRequestSchema = z.object({
  todoId: z.string(),
});

export const postTodoRequestSchema = z.object({
  url: z.string(),
  content: z.string(),
  tagIds: z.array(z.string()),
});

export const putTodoRequestSchema = z.object({
  todoId: z.string(),
  url: z.string(),
  content: z.string().optional(),
  status: z.enum([TODO_STATUS.Suspended, TODO_STATUS.Completed]),
  tagIds: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const deleteTodoRequestSchema = z.object({
  todoId: z.string(),
});
