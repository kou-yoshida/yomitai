import { expect, it, describe, vi } from "vitest";
import { GetProfileRepositoryImpl } from "./GetProfileRepositoryImpl";
import { PrismaClient, type User } from "@prisma/client";

const constantDate = new Date();

/** dbのモックデータ（全てのプロパティが存在するケース） */
const mockUser: User = {
  id: "1",
  name: "testName",
  image: "testImage",
  private: false,
  githubUrl: "testGithubUrl",
  zennUrl: "testZennUrl",
  quitaUrl: "testQuitaUrl",

  email: "testEmail",
  emailVerified: constantDate,
  createdAt: constantDate,
  updatedAt: constantDate,
};

/** dbのモックデータ（nullableのプロパティが全てからのケース）  */
const mockUserNullable: User = {
  id: "1",
  name: null,
  image: null,
  private: false,
  githubUrl: null,
  zennUrl: null,
  quitaUrl: null,

  email: "testEmail",
  emailVerified: constantDate,
  createdAt: constantDate,
  updatedAt: constantDate,
};

describe("GetProfileRepositoryImpl", () => {
  it("idを元にプロフィール情報を取得する", async () => {
    // prisma clientのモック
    const mockPrisma = {
      user: {
        findUnique: vi.fn().mockResolvedValue(mockUser),
      },
    } as unknown as PrismaClient;

    const repository = new GetProfileRepositoryImpl(mockPrisma);
    const result = await repository.execute("1");

    expect(result).toEqual({
      _id: "1",
      _name: "testName",
      _imageUrl: "testImage",
      _isPrivate: false,
      _githubUrl: "testGithubUrl",
      _zennUrl: "testZennUrl",
      _quitaUrl: "testQuitaUrl",
    });
  });

  it("オプショナルな値がnullの場合、フォールバッグを返す", async () => {
    // prisma clientのモック
    const mockPrisma = {
      user: {
        findUnique: vi.fn().mockResolvedValue(mockUserNullable),
      },
    } as unknown as PrismaClient;

    const repository = new GetProfileRepositoryImpl(mockPrisma);
    const result = await repository.execute("1");

    expect(result.name).toBe("No Name");
    expect(result.imageUrl).toBe("No Image");
    expect(result.githubUrl).toBeUndefined();
    expect(result.zennUrl).toBeUndefined();
    expect(result.quitaUrl).toBeUndefined();
  });

  it("ユーザーがnullの場合、NotFoundErrorをthrowする", async () => {
    // prisma clientのモック
    const mockPrisma = {
      user: {
        findUnique: vi.fn().mockResolvedValue(null),
      },
    } as unknown as PrismaClient;

    const repository = new GetProfileRepositoryImpl(mockPrisma);

    expect(async () => await repository.execute("1")).rejects.toThrowError();
  });
});
