import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { apiUrl } from "src/env";
import { LocationType, type LtToServices, type Service } from "src/lib/schema";
import { locationTypes } from "src/lib/types";

export const service = {
  getServicesByLocationTypes: defineAction({
    input: z.array(z.enum(locationTypes)).readonly(),
    handler: async (input) => {
      try {
        const types = new Set(input);
        const resp = await fetch(
          `${apiUrl}/service?locationType=${[...types].join(",")}`
        );
        const result = await resp.json();
        return result as Record<LocationType, Service[]>;
      } catch (error) {
        if (!(error instanceof Error)) {
          throw new ActionError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Thrown error isn't of type "Error", error: ${error}`,
          });
        }
        throw new ActionError({
          message: error.message,
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    },
  }),
  getAllServices: defineAction({
    handler: async () => {
      try {
        const resp = await fetch(`${apiUrl}/service`);
        const result = await resp.json();
        return result as LtToServices;
      } catch (error) {
        if (error instanceof Error) {
          throw new ActionError({
            message: error.message,
            code: "INTERNAL_SERVER_ERROR",
          });
        }
        console.log("error is of wrong type: ", error);
        throw new ActionError({
          message: `error of unknown type ${error}`,
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    },
  }),
};
