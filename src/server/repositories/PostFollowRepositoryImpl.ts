import { PrismaClient } from "@prisma/client";
import { PostFollowRepository } from "../domain/repositories/PostFollowRepository";
import { User } from "../domain/entities/User";
import { PULL_NOTIFICATION_TYPE } from "../domain/entities/constants/PullNotificationType";

export class PostFollowRepositoryImpl implements PostFollowRepository {
  constructor(private prisma: PrismaClient) {}

  async execute(user: User, targetUserId: string): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.followFollowed.create({
        data: {
          followUserId: user.id,
          followedUserId: targetUserId,
        },
      }),
      this.prisma.notification.create({
        data: {
          userId: targetUserId,
          type: PULL_NOTIFICATION_TYPE.Follow,
        },
      }),
    ]);
  }
}
