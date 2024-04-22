export class BaseApiError extends Error {
  constructor(message: string, status: number) {
    super(message);
    this.name = new.target.name;
  }
}
