import type { ActionError } from "astro:actions";
import type { DateTime } from "root";
import type { ValidationError } from "./validations/errors";

export type Product = {
  id: number;
  name: string;
};

export type Service = {
  openingTime: string; //ISO
  closingTime: string; //ISO
  intervalInMinutes: number;
  description: string;
  address: string;
  name: string;
};

export type ServiceValidated = {
  [K in keyof Service]: Service[K];
} & {
  validated: true;
};

export type text = {
  [K in keyof ServiceValidated]: ServiceValidated[K];
};

export type NetworkError = {
  error: string;
};

type APIError = {
  error: { status: number; message: string };
};

export type AstroResponse<T> = T | APIError;

export type ErrorType = ActionError | ValidationError | Error;
