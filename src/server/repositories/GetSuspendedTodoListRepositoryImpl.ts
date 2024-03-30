import { Prisma, PrismaClient } from "@prisma/client";
import { GetSuspendedTodoListRepository } from "../domain/repositories/GetSuspendedTodoListRepository";
import { TODO_STATUS } from "../domain/entities/constants/TodoStatus";
import { SuspendedTodo } from "../domain/entities/SuspendedTodo";
import { UnprocessableEntityError } from "@/src/errors/UnprocessableEntityError";
import { Pagination } from "../domain/entities/Pagination";
import { ListDto } from "../domain/dto/ListDto";

export class GetSuspendedTodoListRepositoryImpl
  implements GetSuspendedTodoListRepository
{
  constructor(private orm: PrismaClient) {}

  async execute({
    userId,
    tagIds,
    pagination,
  }: {
    userId: string;
    tagIds: string[];
    pagination: Pagination;
  }) {
    const query: Prisma.TodoFindManyArgs = {
      skip: pagination.offset,
      take: pagination.limit,
      where: {
        userId,
        status: TODO_STATUS.Suspended,
        tags: { some: { tagId: { in: tagIds } } },
      },
      orderBy: { updatedAt: "desc" },
    };

    const [suspendedTodoList, amount] = await this.orm.$transaction([
      this.orm.todo.findMany(query),
      this.orm.todo.count({
        where: query.where,
      }),
    ]);

    const list = suspendedTodoList.map((todo) => {
      if (todo.status !== TODO_STATUS.Suspended)
        throw new UnprocessableEntityError();
      return SuspendedTodo.reconstruct({
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
