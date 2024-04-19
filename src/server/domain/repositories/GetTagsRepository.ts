import { ListDto } from "../dto/ListDto";
import { Pagination } from "../entities/Pagination";
import { Tag } from "../entities/Tag";
import { User } from "../entities/User";

export interface GetTagsRepository {
  execute(pagination: Pagination, user: User): Promise<ListDto<Tag>>;
}
