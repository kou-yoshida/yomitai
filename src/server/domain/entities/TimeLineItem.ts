import { ActionType } from "./constants/ActionType";
export class TimeLineItem {
  private constructor(
    private _userId: string,
    private _imageUrl: string | undefined,
    private _actionType: ActionType,
    private _updatedAt: Date
  ) {}

  static reconstruct({
    userId,
    imageUrl,
    actionType,
    updatedAt,
  }: {
    userId: string;
    imageUrl: string | undefined;
    actionType: ActionType;
    updatedAt: Date;
  }) {
    return new TimeLineItem(userId, imageUrl, actionType, updatedAt);
  }

  toObject() {
    return {
      userId: this._userId,
      imageUrl: this._imageUrl,
      actionType: this._actionType,
      updatedAt: this._updatedAt,
    };
  }
}
