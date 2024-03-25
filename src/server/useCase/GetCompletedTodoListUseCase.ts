import { CompletedTodo } from "../domain/entities/CompletedTodo";
import { Pagination } from "../domain/entities/Pagination";
import { GetCompletedTodoListRepository } from "../domain/repositories/GetCompletedTodoListRepository";

export class GetCompletedTodoListUseCase {
  constructor(private repository: GetCompletedTodoListRepository) {}

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
