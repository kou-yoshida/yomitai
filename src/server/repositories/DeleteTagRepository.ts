import { PrismaClient } from "@prisma/client";
import { DeleteTagRepository } from "../domain/repositories/DeleteTagRepository";
import { User } from "../domain/entities/User";

export class DeleteTagRepositoryImpl implements DeleteTagRepository {
  constructor(private _orm: PrismaClient) {}

  async execute(user: User, tagId: string) {
    await this._orm.tag.delete({
      where: {
        id: tagId,
        userId: user.id,
      },
    });
  }
}
