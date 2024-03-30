import { PullNotification } from "../entities/PullNotification";

export interface PostPullNotificationRepository {
  execute(notification: PullNotification): Promise<void>;
}
