import { PrismaClient } from "@prisma/client";
import { ListDto } from "../domain/dto/ListDto";
import { TimeLineItem } from "../domain/entities/TimeLineItem";
import { GetTimeLineRepository } from "../domain/repositories/GetTimeLineRepository";
import { Pagination } from "../domain/entities/Pagination";

export class GetTimeLineRepositoryImpl implements GetTimeLineRepository {
  constructor(private _orm: PrismaClient) {}
  async execute(pagination: Pagination): Promise<ListDto<TimeLineItem>> {
    const [_items, count] = await Promise.all([
      this._orm.updatedLog.findMany({
        take: pagination.limit,
        skip: pagination.offset,
        include: {
          user: true,
        },
      }),
      this._orm.updatedLog.count(),
    ]);

    const items = _items.map((item) => {
      return TimeLineItem.reconstruct({
        userId: item.userId,
        updatedAt: item.updatedAt,
        imageUrl: item.user.image || undefined,
        actionType: item.actionType,
      });
    });

    return new ListDto(items, count);
  }
}
