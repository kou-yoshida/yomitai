import { ListDto } from "../dto/ListDto";
import { Follower } from "../entities/Follower";
import { Pagination } from "../entities/Pagination";
import { User } from "../entities/User";

export interface GetFollowersRepository {
  execute(user: User, pagination: Pagination): Promise<ListDto<Follower>>;
}
