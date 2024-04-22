import { PrismaClient } from "@prisma/client";
import { GetUserRepository } from "../domain/repositories/GetUserRepository";
import { User } from "../domain/entities/User";

export class GetUserRepositoryImpl implements GetUserRepository {
  constructor(private prisma: PrismaClient) {}

  async execute(userId: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return;

    return User.reconstruct(
      user.id,
      user.name || undefined,
      user.githubUrl || undefined,
      user.zennUrl || undefined,
      user.quitaUrl || undefined,
      user.image || undefined,
      user.private,
      user.createdAt,
      user.updatedAt
    );
  }
}
