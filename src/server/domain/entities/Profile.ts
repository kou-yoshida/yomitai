import { User } from "@prisma/client";

export class Profile {
  constructor(
    private _id: string,
    private _name: string,
    private _imageUrl: string,
    private _isPrivate: boolean,
    private _githubUrl?: string,
    private _zennUrl?: string,
    private _quitaUrl?: string
  ) {}

  /**
   * prismaのレスポンスからProfileエンティティを生成する
   */
  static fromPrismaResponse(response: User) {
    return new Profile(
      response.id,
      response.name || "No Name",
      response.image || "No Image",
      response.private,
      response.githubUrl || undefined,
      response.zennUrl || undefined,
      response.quitaUrl || undefined
    );
  }

  public toObject() {
    return {
      id: this._id,
      name: this._name,
      imageUrl: this._imageUrl,
      isPrivate: this._isPrivate,
      githubUrl: this._githubUrl,
      zennUrl: this._zennUrl,
      quitaUrl: this._quitaUrl,
    };
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this._name;
  }

  public get imageUrl() {
    return this._imageUrl;
  }

  public get githubUrl() {
    return this._githubUrl;
  }

  public get zennUrl() {
    return this._zennUrl;
  }

  public get quitaUrl() {
    return this._quitaUrl;
  }

  public get isPrivate() {
    return this._isPrivate;
  }
}
