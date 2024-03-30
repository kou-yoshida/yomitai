import { PullNotification } from "../domain/entities/PullNotification";
import { PostPullNotificationRepository } from "../domain/repositories/PostPullNotificationRepository";

export class PostNotificationUseCase {
  constructor(private repository: PostPullNotificationRepository) {}

  async execute(notification: PullNotification): Promise<void> {
    await this.repository.execute(notification);
  }
}
