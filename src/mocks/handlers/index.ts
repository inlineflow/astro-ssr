import { http, HttpResponse } from "msw";
// import { locationTypes, type APIError } from "../../lib/types";
import { locationTypes, type APIError } from "../../lib/types";
import type {
  Location,
  Brand,
  LocationSearchParams,
  LocationCreateFormValues,
  LocationType,
} from "../../lib/schema";
// import { DateTime } from "luxon";
import type { AppointmentPostRequest, Service } from "../../lib/schema";
import { loadData } from "../utils";
import { DateTime } from "luxon";
import i18n from "../../lib/i18n";
// import { ActionError } from "astro:actions";

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
const ltToServices = await loadData<Record<LocationType, Service[]>>(
  "locationTypesToServices.json"
);

const filterLocationTypes = (input: string[] | undefined) => {
  if (!input) {
    return [];
  }

  const result: LocationType[] = [];
  for (const i of input) {
    if ((locationTypes as readonly string[]).includes(i)) {
      result.push(i as LocationType);
    }
  }
  return [...new Set(result)];
};

const serviceHandlers = [
  http.get(`${apiUrl}/service`, ({ request }) => {
    const url = new URL(request.url);
    const typeArgs = url.searchParams.get("locationType")?.split(",");
    const locationTypes = filterLocationTypes(typeArgs);
    console.log("locationTypes: ", locationTypes);
    if (locationTypes.length > 0) {
      const result: Partial<Record<LocationType, Service[]>> = {};
      for (const lt of locationTypes) {
        result[lt] = ltToServices[lt];
      }
      return HttpResponse.json(result);
    }

    console.log("returning ltToServices: ", ltToServices);
    return HttpResponse.json(ltToServices);

    // const error: APIError = {
    //   error: {
    //     message: "no matches",
    //     status: 404,
    //   },
    // };

    // return HttpResponse.json(error);
    // throw new ActionError({
    //   code: "NOT_FOUND",
    //   message: "no matches",
    // });
  }),
];

const locationHandlers = [
  http.post<{ brandId: string }, LocationCreateFormValues>(
    `${apiUrl}/brand/:brandId/location`,
    async ({ request }) => {
      const data = await request.json();
      return HttpResponse.json(
        { message: i18n.t("rest.location_created_successfully") },
        { status: 201 }
      );
    }
  ),
  http.get<{ brandId: string }, never, Location[] | APIError>(
    `${apiUrl}/brand/:brandId/locations`,
    ({ params }) => {
      const { brandId } = params;
      // const brandId = url.searchParams.get("brand");
      console.log("brandId: ", brandId);
      // console.log("url.searchParams: ", url.searchParams);

      if (!brandId) {
        const error: APIError = {
          error: { message: "Brand not found", status: 404 },
        };
        return HttpResponse.json(error);
      }

      const data = brands.find((b) => b.id === brandId)?.locations;
      return HttpResponse.json(data);
    }
  ),
  http.post<never, LocationSearchParams, Location[]>(
    `${apiUrl}/location/search`,
    async ({ request }) => {
      const body = await request.json();
      let result = locations;
      if (typeof body.name === "string") {
        result = result.filter((r) => r.name === body.name);
      }

      if (body.location_type) {
        result = result.filter((r) =>
          r.locationTypes.includes(body.location_type!)
        );
      }

      if (body.opens_at) {
        result = result.filter(
          (r) => DateTime.fromISO(r.openingTime).toFormat("T") === body.opens_at
        );
      }

      if (body.closes_at) {
        result = result.filter(
          (r) =>
            DateTime.fromISO(r.closingTime).toFormat("T") === body.closes_at
        );
      }

      return HttpResponse.json(result);
    }
  ),
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
  ...serviceHandlers,
];
