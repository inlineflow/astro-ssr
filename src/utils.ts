import { ValidationError } from "./validations/errors";

export const isValidationError = (err: unknown): err is ValidationError =>
  err instanceof ValidationError;

export const conjugate = (value: number, words: string[]) => {
  value = Math.abs(value) % 100;
  var num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];
  return words[2];
};
