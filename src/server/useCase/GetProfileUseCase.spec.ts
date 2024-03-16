import { expect, it, describe, vi } from "vitest";

import { PrismaClient, type User } from "@prisma/client";
import { NotFoundError } from "@/src/errors/NotFountError";
import { GetProfileRepositoryImpl } from "../repositories/GetProfileRepositoryImpl";
import { GetProfileUseCase } from "./GetProfileUseCase";

const constantDate = new Date();

describe("GetProfileUseCase", () => {
  // prisma clientのモック
  const mockPrisma = {
    user: {
      findUnique: vi.fn().mockResolvedValue({
        id: "1",
        name: "testName",
        image: "testImage",
        private: true,
        githubUrl: "testGithubUrl",
        zennUrl: "testZennUrl",
        quitaUrl: "testQuitaUrl",

        email: "testEmail",
        emailVerified: constantDate,
        createdAt: constantDate,
        updatedAt: constantDate,
      }),
    },
  } as unknown as PrismaClient;

  // repositoryのモック
  const mockRepository = new GetProfileRepositoryImpl(mockPrisma);

  it("ユーザーのisPrivateがtrueだった場合、何も返さない", async () => {
    const useCase = new GetProfileUseCase(mockRepository);
    const result = await useCase.execute("1");

    expect(result).toBeUndefined();
  });
});
