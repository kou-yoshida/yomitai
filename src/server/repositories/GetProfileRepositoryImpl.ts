import { PrismaClient } from "@prisma/client";
import { GetProfileRepository } from "../domain/repositories/GetProfileRepository";
import { Profile } from "../domain/entities/Profile";
import { NotFoundError } from "@/src/errors/NotFountError";

export class GetProfileRepositoryImpl implements GetProfileRepository {
  constructor(private _orm: PrismaClient) {}

  /**
   * idを元にプロフィール情報を取得する
   */
  execute = async (userId: string) => {
    const result = await this._orm.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!result) throw new NotFoundError();

    return Profile.fromPrismaResponse(result);
  };
}
