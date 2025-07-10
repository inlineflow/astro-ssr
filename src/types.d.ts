import type { ActionError } from "astro:actions";

export type Product = {
  id: number;
  name: string;
};

export type Service = {
  openingTime: number;
};

export type NetworkError = {
  error: string;
};

export type AstroResponse<T> = T | ActionError;
