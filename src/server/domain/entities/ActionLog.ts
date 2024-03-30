import { ActionType } from "./constants/ActionType";

export class ActionLog {
  constructor(
    private _userName: string,
    private _actionType: ActionType,
    private _todoName: string,
    private _todoUrl: string
  ) {}

  toObject() {
    return {
      userName: this._userName,
      actionType: this._actionType,
      todoName: this._todoName,
      todoUrl: this._todoUrl,
    };
  }
}
