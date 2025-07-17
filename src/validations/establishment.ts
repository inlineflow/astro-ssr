import { DateTime } from "luxon";
import type { Establishment } from "root/src/lib/types";
import type { EstablishmentValidated } from "root/src/lib/types";
import { err, ok, type Result } from "../lib/result";
import { ValidationError } from "./errors";

type ValidationResult<T, E> = Result<T, E>;
export const validateService = (
  service: Establishment | undefined
): ValidationResult<EstablishmentValidated, ValidationError> => {
  if (!service) return err(new ValidationError("Failed to fetch service."));

  const open = DateTime.fromISO(service.openingTime);
  const closed = DateTime.fromISO(service.closingTime);

  if (!open.isValid)
    return err(new ValidationError("Opening time is invalid."));
  if (!closed.isValid)
    return err(new ValidationError("Closing time is invalid."));
  if (open.plus({ minutes: service.intervalInMinutes }) > closed)
    return err(
      new ValidationError(
        `The time between opening and closing can't fit an appointment`,
        [
          `Opening time: ${open.toFormat("T")}`,
          `Closing time: ${closed.toFormat("T")}`,
          `Appointment length: ${service.intervalInMinutes} minutes`,
        ]
      )
    );

  console.log("open in validation: ", open);

  return ok({
    ...service,
    validated: true,
  });
};
