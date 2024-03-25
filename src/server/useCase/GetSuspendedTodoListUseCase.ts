import { SuspendedTodo } from "../domain/entities/SuspendedTodo";
import { Pagination } from "../domain/entities/Pagination";
import { GetSuspendedTodoListRepository } from "../domain/repositories/GetSuspendedTodoListRepository";

export class GetSuspendedTodoListUseCase {
  constructor(private repository: GetSuspendedTodoListRepository) {}

  async execute({
    userId,
    tagIds,
    pagination,
  }: {
    userId: string;
    tagIds: string[];
    pagination: Pagination;
  }) {
    const { list, amount } = await this.repository.execute({
      userId,
      tagIds,
      pagination: pagination,
    });

    return {
      list,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        amount,
      },
    };
  }
}
