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

  public get idPrivate() {
    return this._isPrivate;
  }
}
