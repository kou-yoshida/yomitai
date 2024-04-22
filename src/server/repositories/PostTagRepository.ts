import { PrismaClient } from "@prisma/client";
import { User } from "../domain/entities/User";
import { Tag } from "../domain/entities/Tag";
import { PostTagRepository } from "../domain/repositories/PostTagRepository";

export class PostTagRepositoryImpl implements PostTagRepository {
  constructor(private _orm: PrismaClient) {}

  async execute(user: User, tag: Tag) {
    await this._orm.tag.create({
      data: {
        name: tag.name,
        userId: user.id,
      },
    });
  }
}
