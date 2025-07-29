import { http, HttpResponse } from "msw";
import type { APIError, Product } from "../../lib/types";
import type { Service, Location, Brand } from "../../lib/schema";
import { DateTime } from "luxon";
import type { AppointmentPostRequest } from "../../lib/schema";
import { loadData } from "../utils";

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
  {
    durationInMinutes: 90,
    name: "Педикюр",
    serviceId: crypto.randomUUID(),
    tag: "pedicure",
  },
];
const locationId = crypto.randomUUID();
export const brandId = crypto.randomUUID();
const employees = [
  {
    name: "Виктор",
    employeeId: crypto.randomUUID(),
    location: locationId,
    nonWorkingDays: [],
    providesServices: services
      .filter((x) => x.name !== "Педикюр")
      .map((s) => s.serviceId),
  },
  {
    name: "Александр",
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
  services: services.filter((s) => s.name !== "Педикюр"),
  employees: employees,
  address: "Советская 91, 1",
  brandId: brandId,
  description:
    "Откройте для себя оазис спокойствия и возрождения в нашем SPA. Позвольте себе погрузиться в мир гармонии и блаженства, где каждый ритуал направлен на восстановление вашего тела и души. Наши опытные мастера и широкий спектр процедур – от расслабляющих массажей до омолаживающих уходов за кожей – подарят вам незабываемые ощущения и полное обновление. Забудьте о повседневной суете и насладитесь моментом истинного релакса в атмосфере роскоши и уюта.  ",
};
// const locations: Location[] = [
//   location,
//   {
//     name: "СПА у Зои На Московской",
//     address: "Московская 15",
//     services: [...services],
//     employees: employees,
//     brandId: brandId,
//     locationId: crypto.randomUUID(),
//     openingTime: DateTime.now().set({ hour: 10, minute: 0, second: 0 }).toISO(),
//     closingTime: DateTime.now().set({ hour: 18, minute: 0, second: 0 }).toISO(),
//   },
// ];
// const brandsData: brand[] = [
//   {
//     name: "СПА у Зои",
//     id: brandId,
//     locations: locations,
//     description: "Знаменитое СПА, открытое с 2010 года.",
//   },
//   {
//     id: crypto.randomUUID(),
//     locations: [locations[1]] as Location[],
//     description: "Лучший сервис в городе",
//     name: 'Салон "Ноготочки"',
//   },
// ];

const brands = await loadData<Brand[]>("brands.json");
const locations = brands.map((e) => e.locations).flat();

const locationHandlers = [
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
  http.get(`${baseUrl}/location`, () => {
    return HttpResponse.json(locations);
  }),
];

const brandHandlers = [
  http.get(`${baseUrl}/brand`, () => {
    return HttpResponse.json(brands);
  }),
  http.get<{ id: string }, undefined, Brand | APIError>(
    `${baseUrl}/brand/:id`,
    async ({ params }) => {
      const { id } = params;
      const brand = brands.find((e) => e.id === id);
      if (!brand) {
        const error: APIError = {
          error: {
            message: "Not found",
            status: 404,
          },
        };
        return HttpResponse.json(error);
      }
      return HttpResponse.json(brand);
    }
  ),
];

const appointmentHandlers = [
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
];

export const handlers = [
  ...appointmentHandlers,
  ...brandHandlers,
  ...locationHandlers,
];
