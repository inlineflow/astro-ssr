export class ValidationError extends Error {
  public details: string[];

  constructor(message: string, details?: string[]) {
    super(message);
    this.name = "ValidationError";
    this.details = details ?? [];

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}
