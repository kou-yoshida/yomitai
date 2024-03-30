export class PullNotification {
  constructor(
    private _id: string,
    private _type: any,
    private _userId: string
  ) {}

  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }

  get userId() {
    return this._userId;
  }
}
