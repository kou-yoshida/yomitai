import { ListDto } from "../dto/ListDto";
import { Pagination } from "../entities/Pagination";
import { TimeLineItem } from "../entities/TimeLineItem";
import { User } from "../entities/User";

export interface GetTimeLineRepository {
  execute(pagination: Pagination, user?: User): Promise<ListDto<TimeLineItem>>;
}
