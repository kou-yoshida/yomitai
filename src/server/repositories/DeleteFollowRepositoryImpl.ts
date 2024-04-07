import { PrismaClient } from "@prisma/client";
import { User } from "../domain/entities/User";
import { DeleteFollowRepository } from "../domain/repositories/DeleteFollowRepository";

export class DeleteFollowRepositoryImpl implements DeleteFollowRepository {
  constructor(private _orm: PrismaClient) {}
  async execute(user: User, targetUserId: string) {
    await this._orm.followFollowed.delete({
      where: {
        followedUserId_followUserId: {
          followUserId: user.id,
          followedUserId: targetUserId,
        },
      },
    });
  }
}
