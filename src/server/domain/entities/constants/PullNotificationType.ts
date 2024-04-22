export const PULL_NOTIFICATION_TYPE = {
  Follow: "FOLLOW",
  Todo: "TODO",
} as const;
export type PullNotificationType =
  (typeof PULL_NOTIFICATION_TYPE)[keyof typeof PULL_NOTIFICATION_TYPE];
