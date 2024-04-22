import { PrismaClient } from "@prisma/client";
import { ListDto } from "../domain/dto/ListDto";
import { Follower } from "../domain/entities/Follower";
import { Pagination } from "../domain/entities/Pagination";
import { User } from "../domain/entities/User";
import { GetFollowingsRepository } from "../domain/repositories/GetFollowingsRepository";
import { Following } from "../domain/entities/Following";

export class GetFollowingsRepositoryImpl implements GetFollowingsRepository {
  constructor(private orm: PrismaClient) {}

  async execute(
    user: User,
    pagination: Pagination
  ): Promise<ListDto<Following>> {
    const [result, amount] = await this.orm.$transaction([
      this.orm.followFollowed.findMany({
        where: {
          followUserId: user.id,
        },
        include: {
          followedUser: true,
        },
        skip: pagination.offset,
        take: pagination.limit,
      }),
      this.orm.followFollowed.count({
        where: {
          followUserId: user.id,
        },
      }),
    ]);

    const list = result.map(({ followedUser }) => {
      return Following.reconstruct({
        userId: followedUser.id,
        imageUrl: followedUser.image || "",
        isPrivate: followedUser.private,
      });
    });

    return new ListDto(list, amount);
  }
}
