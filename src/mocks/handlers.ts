import { http, HttpResponse } from "msw";
import type { APIError, Product, Service } from "../types";
import { DateTime } from "luxon";

// for some reason when I import it from 'src/env' it doesn't work
const baseUrl = import.meta.env.VITE_BASE_URL;

const delay = async (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));
const today = new Date();
const weekAgo = DateTime.fromJSDate(today).minus({ week: 1 });
const services: Service[] = [
  {
    name: "СПА у Зои",
    openingTime: DateTime.now().set({ hour: 10, minute: 0, second: 0 }).toISO(),
    closingTime: DateTime.now().set({ hour: 18, minute: 0, second: 0 }).toISO(),
    intervalInMinutes: 30,
    address: "Советская 91, 1",
    description:
      "Откройте для себя оазис спокойствия и возрождения в нашем SPA. Позвольте себе погрузиться в мир гармонии и блаженства, где каждый ритуал направлен на восстановление вашего тела и души. Наши опытные мастера и широкий спектр процедур – от расслабляющих массажей до омолаживающих уходов за кожей – подарят вам незабываемые ощущения и полное обновление. Забудьте о повседневной суете и насладитесь моментом истинного релакса в атмосфере роскоши и уюта.  ",
  },
  {
    openingTime: DateTime.now().set({ hour: 15, minute: 0, second: 0 }).toISO(),
    closingTime: DateTime.now().set({ hour: 11, minute: 0, second: 0 }).toISO(),
    intervalInMinutes: 30,
    description: "Лучший сервис в городе",
    address: "Ленина 15, дом 2",
    name: 'Салон "Ноготочки"',
  },
  {
    openingTime: DateTime.now()
      .set({ hour: 10, minute: 31, second: 0 })
      .toISO(),
    closingTime: DateTime.now().set({ hour: 11, minute: 0, second: 0 }).toISO(),
    intervalInMinutes: 30,
    description: "Баня, сауна, бильярд",
    address: "Дзержинская 15, 31б",
    name: 'Баня "Совушка"',
  },
];

const bookedDates = Array.from({ length: 7 }, (_, i) =>
  weekAgo.plus({ day: i })
).sort((a, b) => a.toUnixInteger() - b.toUnixInteger());

export const handlers = [
  http.get<{ id: string }, undefined, Service | APIError>(
    `${baseUrl}/service/:id`,
    async ({ params }) => {
      const { id: paramId } = params;
      const id = parseInt(paramId as string) - 1;
      if (id < 0) {
        const error: APIError = {
          error: {
            message: "Service ID cannot be negative",
            status: 404,
          },
        };
        // const error = new ActionError({
        //   message: "Id can't be less than 1",
        //   code: "BAD_REQUEST",
        // });
        return HttpResponse.json(error);
      }

      // await delay(1000);
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
