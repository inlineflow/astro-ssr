import { http, HttpResponse } from "msw";
import type { Product } from "../types";

export const handlers = [
  http.get("https://example.com/users", () => {
    return HttpResponse.json([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ]);
  }),
  http.post<never, Product, undefined>(
    "https://api.example.com/products",
    async ({ request }) => {
      const newProduct = await request.json();
      return HttpResponse.json(
        { message: "Product created successfully", ...newProduct },
        { status: 201 }
      );
    }
  ),
];
