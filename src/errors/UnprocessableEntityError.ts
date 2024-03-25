import { BaseApiError } from "./base/BaseApiError";

export class UnprocessableEntityError extends BaseApiError {
  constructor(message = "Unprocessable Entity") {
    super(message, 422);
  }
}
