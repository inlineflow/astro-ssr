import { http, HttpResponse } from "msw";
import type { NetworkError, Product, Service } from "../types";
import { addDays, setHours } from "date-fns";
// import { baseUrl } from "src/env";

// for some reason when I import it from 'src/env' it doesn't work
const baseUrl = import.meta.env.VITE_BASE_URL;

// const delay = async (url: string, resolver: HttpResponseResolver): HttpResponse => {
//   return await new Promise(resolve => setTimeout(resolve, 1000));
//   return resolver
//   }
// };

const delay = async (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));
const today = new Date();
const services: Service[] = [
  { openingTime: setHours(new Date(), 10).setMinutes(0) },
];

const bookedDates = Array.from({ length: 7 }, (_, i) =>
  addDays(today, -i)
).sort();

export const handlers = [
  http.get<{ id: string }, undefined, Service | NetworkError>(
    `${baseUrl}/service/:id`,
    async ({ params }) => {
      const { id: paramId } = params;
      const id = parseInt(paramId as string) - 1;
      if (id < 0) {
        return HttpResponse.json(
          { error: "Id can't be less than 1" },
          { status: 400 }
        );
      }

      await delay(1000);
      return HttpResponse.json(services[id]);
    }
  ),
  http.get(`${baseUrl}/appointments/booked`, async () => {
    await delay(1000);
    return HttpResponse.json(bookedDates);
  }),
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
