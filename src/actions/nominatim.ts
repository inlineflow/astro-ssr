import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import type { Geodata, NominatimFullData } from "src/lib/schema";
import { delay } from "src/mocks/utils";

export const nominatim = {
  lookupByLatLng: defineAction({
    input: z.tuple([z.number(), z.number()]),
    handler: async (input) => {
      try {
        if (import.meta.env.DEV) delay(1200);
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
        const result = (await resp.json()) as NominatimFullData;
        console.log("result: ", result);
        return result;
      } catch (error) {
        console.log("error when fetching from Nominatim: ", error);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Couldn't fetch address information",
        });
      }
    },
  }),
};
