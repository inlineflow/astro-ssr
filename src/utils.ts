import { ValidationError } from "./validations/errors";

export const isValidationError = (err: unknown): err is ValidationError =>
  err instanceof ValidationError;
