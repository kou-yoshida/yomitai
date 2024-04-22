import { User } from "../entities/User";

export interface DeleteFollowRepository {
  execute(user: User, targetUserId: string): Promise<void>;
}
