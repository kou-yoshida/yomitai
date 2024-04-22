import { BaseApiError } from "./base/BaseApiError";

export class UnauthenticatedError extends BaseApiError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}
