export const TODO_STATUS = {
  Suspended: "SUSPENDED",
  Completed: "COMPLETED",
  Deleted: "DELETED",
} as const;
export type TodoStatus = (typeof TODO_STATUS)[keyof typeof TODO_STATUS];
