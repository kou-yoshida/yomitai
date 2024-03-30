import { User } from "../entities/User";

export interface GetUserRepository {
  execute(userId: string): Promise<User | void>;
}
