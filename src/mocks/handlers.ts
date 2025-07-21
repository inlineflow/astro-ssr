import { http, HttpResponse } from "msw";
import type { APIError, Product } from "../lib/types";
import type { Service, Location, Establishment } from "../lib/schema";
import { DateTime } from "luxon";
import type { AppointmentPostRequest } from "../lib/schema";

// for some reason when I import it from 'src/env' it doesn't work
const baseUrl = import.meta.env.VITE_BASE_URL;

const delay = async (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));
const today = new Date();
const weekAgo = DateTime.fromJSDate(today).minus({ week: 1 });
const services: Service[] = [
  {
    durationInMinutes: 30,
    name: "Стрижка",
    serviceId: crypto.randomUUID(),
    tag: "hairdressing",
  },
  {
    durationInMinutes: 60,
    name: "Маникюр",
    serviceId: crypto.randomUUID(),
    tag: "nail-polish",
  },
];
const locationId = crypto.randomUUID();
export const establishmentId = crypto.randomUUID();
const employees = [
  {
    name: "Виктор",
    employeeId: crypto.randomUUID(),
    location: locationId,
    nonWorkingDays: [],
    providesServices: services.map((s) => s.serviceId),
  },
];
const location: Location = {
  locationId: locationId,
  name: "СПА у Зои На Советской",
  openingTime: DateTime.now().set({ hour: 10, minute: 0, second: 0 }).toISO(),
  closingTime: DateTime.now().set({ hour: 18, minute: 0, second: 0 }).toISO(),
  services: services,
  employees: employees,
  address: "Советская 91, 1",
  establishmentId: establishmentId,
  description:
    "Откройте для себя оазис спокойствия и возрождения в нашем SPA. Позвольте себе погрузиться в мир гармонии и блаженства, где каждый ритуал направлен на восстановление вашего тела и души. Наши опытные мастера и широкий спектр процедур – от расслабляющих массажей до омолаживающих уходов за кожей – подарят вам незабываемые ощущения и полное обновление. Забудьте о повседневной суете и насладитесь моментом истинного релакса в атмосфере роскоши и уюта.  ",
};
const locations: Location[] = [
  location,
  {
    name: "СПА у Зои На Московской",
    address: "Московская 15",
    services: [
      ...services,
      {
        durationInMinutes: 90,
        name: "Педикюр",
        serviceId: crypto.randomUUID(),
        tag: "pedicure",
      },
    ],
    employees: employees,
    establishmentId: establishmentId,
    locationId: crypto.randomUUID(),
    openingTime: DateTime.now().set({ hour: 10, minute: 0, second: 0 }).toISO(),
    closingTime: DateTime.now().set({ hour: 18, minute: 0, second: 0 }).toISO(),
  },
];
const establishments: Establishment[] = [
  {
    name: "СПА у Зои",
    id: establishmentId,
    locations: locations,
    description: "Знаменитое СПА, открытое с 2010 года.",
  },
  {
    // openingTime: DateTime.now().set({ hour: 15, minute: 0, second: 0 }).toISO(),
    // closingTime: DateTime.now().set({ hour: 11, minute: 0, second: 0 }).toISO(),
    // intervalInMinutes: 30,
    id: crypto.randomUUID(),
    locations: locations,
    description: "Лучший сервис в городе",
    // address: "Ленина 15, дом 2",
    name: 'Салон "Ноготочки"',
  },
  // {
  //   openingTime: DateTime.now()
  //     .set({ hour: 10, minute: 31, second: 0 })
  //     .toISO(),
  //   closingTime: DateTime.now().set({ hour: 11, minute: 0, second: 0 }).toISO(),
  //   intervalInMinutes: 30,
  //   description: "Баня, сауна, бильярд",
  //   address: "Дзержинская 15, 31б",
  //   name: 'Баня "Совушка"',
  // },
].map((est) => {
  return {
    ...est,
    locations: est.locations.map((loc) => {
      const { employees, ...locLight } = loc;
      return locLight;
    }),
  };
});

const bookedDates = Array.from({ length: 7 }, (_, i) =>
  weekAgo.plus({ day: i })
).sort((a, b) => a.toUnixInteger() - b.toUnixInteger());

export const handlers = [
  http.get<{ id: string }, undefined, Location | APIError>(
    `${baseUrl}/location/:id`,
    async ({ params }) => {
      const { id } = params;
      const location = locations.find((loc) => loc.locationId === id);
      if (!location) {
        const error: APIError = {
          error: {
            message: "Not found",
            status: 404,
          },
        };
        return HttpResponse.json(error);
      }
      return HttpResponse.json(location);
    }
  ),
  http.post<never, AppointmentPostRequest>(
    `${baseUrl}/appointment`,
    async ({ request }) => {
      console.log(request.body);
      await delay(1000);
      return HttpResponse.json(
        { appointmentId: crypto.randomUUID() },
        { status: 201 }
      );
    }
  ),
  http.get(`${baseUrl}/establishment`, () => {
    return HttpResponse.json(establishments);
  }),
  http.get<{ id: string }, undefined, Establishment | APIError>(
    `${baseUrl}/establishment/:id`,
    async ({ params }) => {
      const { id } = params;
      const establishment = establishments.find((e) => e.id === id);
      if (!establishment) {
        const error: APIError = {
          error: {
            message: "Not found",
            status: 404,
          },
        };
        return HttpResponse.json(error);
      }
      return HttpResponse.json(establishment);
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
