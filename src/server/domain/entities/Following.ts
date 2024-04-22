export class Following {
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
    return new Following(userId, isPrivate ? undefined : imageUrl, isPrivate);
  }

  toObject() {
    return {
      userId: this._userId,
      imageUrl: this._isPrivate ? "" : this._imageUrl,
      isPrivate: this._isPrivate,
    };
  }
}
