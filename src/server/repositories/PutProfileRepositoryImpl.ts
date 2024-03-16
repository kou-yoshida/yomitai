import { PrismaClient } from "@prisma/client";
import { PutProfileRepository } from "../domain/repositories/PutProfileRepository";
import { ProfilePutDto } from "../domain/dto/ProfilePutDto";
import { Profile } from "../domain/entities/Profile";

export class PutProfileRepositoryImpl implements PutProfileRepository {
  constructor(private orm: PrismaClient) {}

  async execute(userId: string, params: ProfilePutDto) {
    const result = await this.orm.user.update({
      where: {
        id: userId,
      },
      data: {
        githubUrl: params.githubUrl,
        zennUrl: params.zennUrl,
        quitaUrl: params.quitaUrl,
        private: params.isPrivate,
      },
    });

    return Profile.fromPrismaResponse(result);
  }
}
