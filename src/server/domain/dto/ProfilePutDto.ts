export class ProfilePutDto {
  constructor(
    public _isPrivate: boolean,
    public _githubUrl?: string,
    public _zennUrl?: string,
    public _quitaUrl?: string
  ) {}

  /**
   * zodでparseされたリクエストbodyからProfileUpdateDtoを生成する
   */
  static fromRequest(params: {
    githubUrl?: string;
    zennUrl?: string;
    quitaUrl?: string;
    isPrivate: boolean;
  }) {
    return new ProfilePutDto(
      params.isPrivate,
      params.githubUrl,
      params.zennUrl,
      params.quitaUrl
    );
  }

  get githubUrl() {
    return this._githubUrl;
  }

  get zennUrl() {
    return this._zennUrl;
  }

  get quitaUrl() {
    return this._quitaUrl;
  }

  get isPrivate() {
    return this._isPrivate;
  }
}
