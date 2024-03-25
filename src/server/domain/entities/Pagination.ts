export class Pagination {
  constructor(private _page: number, private _limit: number) {}

  public get page() {
    return this._page;
  }

  public get limit() {
    return this._limit;
  }

  public get offset() {
    return (this._page - 1) * this._limit;
  }
}
