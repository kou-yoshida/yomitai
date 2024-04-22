import { ListDto } from "../dto/ListDto";
import { Pagination } from "../entities/Pagination";
import { SuspendedTodo } from "../entities/SuspendedTodo";

export interface GetSuspendedTodoListRepository {
  execute: ({
    userId,
    tagIds,
    pagination,
  }: {
    userId: string;
    tagIds: string[];
    pagination: Pagination;
  }) => Promise<ListDto<SuspendedTodo>>;
}
