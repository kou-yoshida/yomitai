import { UnprocessableEntityError } from "@/src/errors/UnprocessableEntityError";

export class Tag {
  private constructor(private _id: string | undefined, private _name: string) {}

  static reconstruct({ id, name }: { id: string | undefined; name: string }) {
    return new Tag(id, name);
  }

  static create({ name }: { name: string }) {
    return new Tag(undefined, name);
  }

  get id() {
    if (this._id == null) throw new UnprocessableEntityError();
    return this._id;
  }

  get name() {
    return this._name;
  }
}
