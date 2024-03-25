import { ListDto } from "../dto/ListDto";
import { CompletedTodo } from "../entities/CompletedTodo";
import { Pagination } from "../entities/Pagination";

export interface GetCompletedTodoListRepository {
  execute: ({
    userId,
    tagIds,
    pagination,
  }: {
    userId: string;
    tagIds: string[];
    pagination: Pagination;
  }) => Promise<ListDto<CompletedTodo>>;
}
