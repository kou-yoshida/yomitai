export class Follower {
  private constructor(
    private _userId: string,
    private _imageUrl: string | undefined,
    private _isPrivate: boolean
  ) {}

  static reconstruct({
    userId,
    imageUrl,
    isPrivate,
  }: {
    userId: string;
    imageUrl: string;
    isPrivate: boolean;
  }) {
    return new Follower(userId, isPrivate ? undefined : imageUrl, isPrivate);
  }

  toObject() {
    return {
      userId: this._userId,
      imageUrl: this._imageUrl,
      isPrivate: this._isPrivate,
    };
  }
}
