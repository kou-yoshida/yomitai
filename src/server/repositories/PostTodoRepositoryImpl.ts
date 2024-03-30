import { PrismaClient } from "@prisma/client";
import { PostTodoRepository } from "../domain/repositories/PostTodoRepository";
import { CompletedTodo } from "../domain/entities/CompletedTodo";
import { SuspendedTodo } from "../domain/entities/SuspendedTodo";
import { TODO_STATUS } from "../domain/entities/constants/TodoStatus";
import { ACTION_TYPE } from "../domain/entities/constants/ActionType";
import { PULL_NOTIFICATION_TYPE } from "../domain/entities/constants/PullNotificationType";

export class PostTodoRepositoryImpl implements PostTodoRepository {
  constructor(private orm: PrismaClient) {}

  async execute(
    todo: CompletedTodo | SuspendedTodo,
    tagIds: string[],
    notificationTargetIds: string[]
  ) {
    const [_todo] = await this.orm.$transaction([
      this.orm.todo.create({
        data: {
          id: todo.id,
          url: todo.url,
          content: todo.content,
          userId: todo.userId,
          status:
            todo instanceof CompletedTodo
              ? TODO_STATUS.Completed
              : TODO_STATUS.Suspended,
          createdAt: todo.createdAt,
          updatedAt: todo.updatedAt,

          tags: {
            createMany: {
              data: tagIds.map((tagId) => ({
                tagId,
              })),
            },
          },

          updatedLogs:
            todo instanceof SuspendedTodo
              ? {
                  create: {
                    userId: todo.userId,
                    actionType: ACTION_TYPE.Create,
                  },
                }
              : {},
        },
      }),
      this.orm.notification.createMany({
        data: notificationTargetIds.map((id) => ({
          userId: id,
          type: PULL_NOTIFICATION_TYPE.Todo,
        })),
      }),
    ]);

    return todo instanceof CompletedTodo
      ? CompletedTodo.reconstruct({
          id: _todo.id,
          url: _todo.url,
          content: _todo.content || undefined,
          userId: _todo.userId,
          createdAt: _todo.createdAt,
          updatedAt: _todo.updatedAt,
        })
      : SuspendedTodo.reconstruct({
          id: _todo.id,
          url: _todo.url,
          content: _todo.content || undefined,
          userId: _todo.userId,
          createdAt: _todo.createdAt,
          updatedAt: _todo.updatedAt,
        });
  }
}
