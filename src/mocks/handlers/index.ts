import { http, HttpResponse } from "msw";
import type { APIError } from "../../lib/types";
import type { Location, Brand } from "../../lib/schema";
// import { DateTime } from "luxon";
import type { AppointmentPostRequest } from "../../lib/schema";
import { loadData } from "../utils";

// const env = loadEnv("development", process.cwd());
// for some reason when I import it from 'src/env' it doesn't work
// const baseUrl = import.meta.env.VITE_BASE_URL;
// const apiUrl = process.env.API_URL;
const apiUrl = "https://www.api.example.com";
console.log("apiUrl in mock handlers: ", apiUrl);


const delay = async (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const brands = await loadData<Brand[]>("brands.json");
const locations = brands.map((e) => e.locations).flat();

const locationHandlers = [
  http.get<{ id: string }, undefined, Location | APIError>(
    `${apiUrl}/location/:id`,
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
  http.get(`${apiUrl}/location`, () => {
    return HttpResponse.json(locations);
  }),
];

const brandHandlers = [
  http.get(`${apiUrl}/brand`, () => {
    return HttpResponse.json(brands);
  }),
  http.get<{ id: string }, undefined, Brand | APIError>(
    `${apiUrl}/brand/:id`,
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
    `${apiUrl}/appointment`,
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
