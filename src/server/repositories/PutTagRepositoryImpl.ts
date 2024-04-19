import { PrismaClient } from "@prisma/client";
import { PutTagRepository } from "../domain/repositories/PutTagRepository";
import { User } from "../domain/entities/User";
import { Tag } from "../domain/entities/Tag";

export class PutTagRepositoryImpl implements PutTagRepository {
  constructor(private _orm: PrismaClient) {}

  async execute(user: User, tag: Tag) {
    await this._orm.tag.update({
      where: {
        id: tag.id,
        userId: user.id,
      },
      data: {
        name: tag.name,
      },
    });
  }
}
