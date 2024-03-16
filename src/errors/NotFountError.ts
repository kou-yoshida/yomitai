import { BaseApiError } from "./base/BaseApiError";

export class NotFoundError extends BaseApiError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}
