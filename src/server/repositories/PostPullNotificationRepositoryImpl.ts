import { PrismaClient } from "@prisma/client";
import { PostPullNotificationRepository } from "../domain/repositories/PostPullNotificationRepository";
import { PullNotification } from "../domain/entities/PullNotification";

export class PostPullNotificationRepositoryImpl
  implements PostPullNotificationRepository
{
  constructor(private prisma: PrismaClient) {}

  async execute(notification: PullNotification): Promise<void> {
    await this.prisma.notification.create({
      data: {
        userId: notification.userId,
        type: notification.type,
      },
    });
  }
}
