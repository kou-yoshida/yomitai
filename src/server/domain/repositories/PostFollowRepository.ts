import { User } from "../entities/User";

export interface PostFollowRepository {
  execute(user: User, targetUserId: string): Promise<void>;
}
