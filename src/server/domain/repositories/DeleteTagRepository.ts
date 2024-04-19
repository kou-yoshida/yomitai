import { User } from "../entities/User";

export interface DeleteTagRepository {
  execute(user: User, tagId: string): Promise<void>;
}
