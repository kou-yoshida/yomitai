import { Pagination } from "../entities/Pagination";

/**
 * エンティティのリストDTO
 */
export class ListDto<T> {
  constructor(public list: T[], public amount: number) {}
}
