import { http, HttpResponse } from "msw";
import type { Product } from "../types";
// import { baseUrl } from "src/env";

// for some reason when I import it from 'src/env' it doesn't work
const baseUrl = import.meta.env.VITE_BASE_URL;

export const handlers = [
  http.get(`${baseUrl}/tagline`, () => {
    return HttpResponse.json({ tagline: "Hello world from MSW" });
  }),
  http.get(`${baseUrl}/users`, () => {
    return HttpResponse.json([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ]);
  }),
  http.post<never, Product, undefined>(
    `${baseUrl}/api/products`,
    async ({ request }) => {
      const newProduct = await request.json();
      return HttpResponse.json(
        { message: "Product created successfully", ...newProduct },
        { status: 201 }
      );
    }
  ),
];
