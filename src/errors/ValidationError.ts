import { BaseApiError } from "./base/BaseApiError";

export class ValidationError extends BaseApiError {
  constructor(message = "Validation Error") {
    super(message, 400);
  }
}
