import { Tag } from "../entities/Tag";
import { User } from "../entities/User";

export interface PutTagRepository {
  execute(user: User, tag: Tag): Promise<void>;
}
