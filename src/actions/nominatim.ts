import { defineAction } from "astro:actions";
import { z } from "astro:schema";

type NominatimData = {
  address: {
    house_number: string;
    road: string;
    city_district: string;
    city: string;
    "ISO3166-2-lvl4": string;
    postcode: string;
    country: string;
    country_code: string;
  };
};

export const nominatim = {
  lookupByLatLng: defineAction({
    input: z.tuple([z.number(), z.number()]),
    handler: async (input) => {
      console.log("input: ", input);
      const resp = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${input[0]}&lon=${input[1]}&format=json&accept-language=ru`,
        {
          headers: {
            "User-Agent": "ScheduleMate/test",
            "Accept-Language": "ru-RU",
          },
        }
      );
      const result = (await resp.json()) as NominatimData;
      console.log("result: ", result);
      return result;
    },
  }),
};
