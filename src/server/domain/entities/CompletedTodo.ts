import { TODO_STATUS } from "./constants/TodoStatus";

export class CompletedTodo {
  private constructor(
    private _id: string | undefined,
    private _url: string,
    private _content: string | undefined,
    private _status: typeof TODO_STATUS.Completed = TODO_STATUS.Completed,
    private _userId: string,
    private _createdAt: Date,
    private _updatedAt: Date
  ) {}

  static create({
    url,
    content,
    userId,
  }: {
    url: string;
    content: string | undefined;
    userId: string;
  }) {
    const now = new Date();
    return new CompletedTodo(
      undefined,
      url,
      content,
      TODO_STATUS.Completed,
      userId,
      now,
      now
    );
  }

  static reconstruct({
    id,
    url,
    content,
    userId,
    createdAt,
    updatedAt,
  }: {
    id: string;
    url: string;
    content: string | undefined;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return new CompletedTodo(
      id,
      url,
      content,
      TODO_STATUS.Completed,
      userId,
      createdAt,
      updatedAt
    );
  }

  public get id() {
    return this._id;
  }

  public get url() {
    return this._url;
  }

  public get content() {
    return this._content;
  }

  public get status() {
    return this._status;
  }

  public get userId() {
    return this._userId;
  }

  public get createdAt() {
    return this._createdAt;
  }

  public get updatedAt() {
    return this._updatedAt;
  }

  public toObject() {
    return {
      id: this._id,
      url: this._url,
      content: this._content,
      status: this._status,
      userId: this._userId,
    };
  }
}
