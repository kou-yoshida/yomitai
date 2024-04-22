export const ACTION_TYPE = {
  Create: "CREATE",
  Complete: "COMPLETE",
} as const;
export type ActionType = (typeof ACTION_TYPE)[keyof typeof ACTION_TYPE];
