import { ListDto } from "../dto/ListDto";
import { Pagination } from "../entities/Pagination";
import { TimeLineItem } from "../entities/TimeLineItem";

export interface GetTimeLineRepository {
  execute(pagination: Pagination): Promise<ListDto<TimeLineItem>>;
}
