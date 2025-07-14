import type { ActionError } from "astro:actions";
import type { DateTime } from "root";

export type Product = {
  id: number;
  name: string;
};

export type Service = {
  openingTime: string; //ISO
  closingTime: string; //ISO
  intervalInMinutes: number;
};

export type ServiceValidated = {
  openingTime: DateTime<true>;
  closingTime: DateTime<true>;
  intervalInMinutes: number;
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
