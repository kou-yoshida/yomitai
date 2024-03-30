export class User {
  private constructor(
    private _id: string,
    private _name: string | undefined,
    private _githubUrl: string | undefined,
    private _zennUrl: string | undefined,
    private _quitaUrl: string | undefined,
    private _imageUrl: string | undefined,
    private _private: boolean,
    private _createdAt: Date,
    private _updatedAt: Date
  ) {}

  static reconstruct(
    id: string,
    name: string | undefined,
    githubUrl: string | undefined,
    zennUrl: string | undefined,
    quitaUrl: string | undefined,
    imageUrl: string | undefined,
    isPrivate: boolean,
    createdAt: Date,
    updatedAt: Date
  ) {
    return new User(
      id,
      name,
      githubUrl,
      zennUrl,
      quitaUrl,
      imageUrl,
      isPrivate,
      createdAt,
      updatedAt
    );
  }

  get id() {
    return this._id;
  }

  isPrivate() {
    return this._private;
  }

  toObject() {
    return {
      id: this._id,
      name: this._name,
      githubUrl: this._githubUrl,
      zennUrl: this._zennUrl,
      quitaUrl: this._quitaUrl,
      imageUrl: this._imageUrl,
      isPrivate: this._private,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
