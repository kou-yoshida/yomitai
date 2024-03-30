import { ListDto } from "../dto/ListDto";
import { Following } from "../entities/Following";
import { Pagination } from "../entities/Pagination";
import { User } from "../entities/User";

export interface GetFollowingsRepository {
  execute(user: User, pagination: Pagination): Promise<ListDto<Following>>;
}
