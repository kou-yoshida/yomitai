import { GetProfileRepositoryImpl } from "../repositories/GetProfileRepositoryImpl";

export class GetProfileUseCase {
  constructor(private repository: GetProfileRepositoryImpl) {}

  /**
   * idを元にプロフィール情報を取得する
   */
  execute = async (userId: string) => {
    const profile = await this.repository.execute(userId);

    if (profile.idPrivate) return;

    return profile;
  };
}
