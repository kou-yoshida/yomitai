import { expect, it, describe, vi } from "vitest";

import { PrismaClient, type Todo } from "@prisma/client";
import { GetCompletedTodoListRepositoryImpl } from "./GetCompletedTodoListRepositoryImpl";
import { Pagination } from "../domain/entities/Pagination";
import { ListDto } from "../domain/dto/ListDto";
import { CompletedTodo } from "../domain/entities/CompletedTodo";

describe("GetProfileRepositoryImpl", () => {
  const mockDate = new Date();
  it("取得したデータからListDto<CompletedTodo>の値が生成される", async () => {
    const mockTodo = {
      id: "1",
      url: "url",
      content: "content",
      status: "COMPLETED",
      userId: "string",
      createdAt: mockDate,
      updatedAt: mockDate,
    } satisfies Todo;

    const mockPrisma = {
      $transaction: vi.fn().mockResolvedValue([[mockTodo], 100]),
      todo: {
        findMany: vi.fn(),
        count: vi.fn(),
      },
    } as unknown as PrismaClient;

    const repository = new GetCompletedTodoListRepositoryImpl(mockPrisma);

    const result = await repository.execute({
      userId: "string",
      tagIds: ["string"],
      pagination: new Pagination(1, 10),
    });

    expect(result).toEqual(
      new ListDto(
        [
          new CompletedTodo(
            mockTodo.id,
            mockTodo.url,
            mockTodo.content,
            mockTodo.status,
            mockTodo.userId,
            mockTodo.createdAt,
            mockTodo.updatedAt
          ),
        ],
        100
      )
    );
  });

  it("取得したデータにstatusがCompleted以外のものが含まれていた場合、UnprocessableEntityErrorがthrowされる", async () => {
    const mockTodo = {
      id: "1",
      url: "url",
      content: "content",
      status: "SUSPENDED",
      userId: "string",
      createdAt: mockDate,
      updatedAt: mockDate,
    } satisfies Todo;

    const mockPrisma = {
      $transaction: vi.fn().mockResolvedValue([[mockTodo], 100]),
      todo: {
        findMany: vi.fn(),
        count: vi.fn(),
      },
    } as unknown as PrismaClient;

    const repository = new GetCompletedTodoListRepositoryImpl(mockPrisma);

    expect(
      async () =>
        await repository.execute({
          userId: "string",
          tagIds: ["string"],
          pagination: new Pagination(1, 10),
        })
    ).rejects.toThrowError("Unprocessable Entity");
  });
});
