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

    return new Profile(
      result.id,
      result.name || "No Name",
      result.image || "No Image",
      result.private,
      result.githubUrl || undefined,
      result.zennUrl || undefined,
      result.quitaUrl || undefined
    );
  };
}
