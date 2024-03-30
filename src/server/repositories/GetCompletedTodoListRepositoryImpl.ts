import { Prisma, PrismaClient } from "@prisma/client";
import { GetCompletedTodoListRepository } from "../domain/repositories/GetCompletedTodoListRepository";
import { CompletedTodo } from "../domain/entities/CompletedTodo";
import { TODO_STATUS } from "../domain/entities/constants/TodoStatus";
import { UnprocessableEntityError } from "@/src/errors/UnprocessableEntityError";
import { Pagination } from "../domain/entities/Pagination";
import { ListDto } from "../domain/dto/ListDto";

export class GetCompletedTodoListRepositoryImpl
  implements GetCompletedTodoListRepository
{
  constructor(private readonly orm: PrismaClient) {}

  async execute({
    userId,
    tagIds,
    pagination,
  }: {
    userId: string;
    tagIds: string[];
    pagination: Pagination;
  }): Promise<InstanceType<typeof ListDto<CompletedTodo>>> {
    const query: Prisma.TodoFindManyArgs = {
      skip: pagination.offset,
      take: pagination.limit,
      where: {
        userId,
        status: TODO_STATUS.Completed,
        tags: { some: { tagId: { in: tagIds } } },
      },
      orderBy: { updatedAt: "desc" },
    };

    const [completedTodoList, amount] = await this.orm.$transaction([
      this.orm.todo.findMany(query),
      this.orm.todo.count({
        where: query.where,
      }),
    ]);

    const list = completedTodoList.map((todo) => {
      if (todo.status !== TODO_STATUS.Completed)
        throw new UnprocessableEntityError();

      return CompletedTodo.reconstruct({
        id: todo.id,
        url: todo.url,
        content: todo.content || undefined,
        userId: todo.userId,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      });
    });

    return new ListDto(list, amount);
  }
}
