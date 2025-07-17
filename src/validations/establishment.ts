import { DateTime } from "luxon";
import type { Service, ServiceValidated } from "src/lib/schema";
import { err, ok, type Result } from "../lib/result";
import { ValidationError } from "./errors";

type ValidationResult<T, E> = Result<T, E>;
export const validateService = (
  openingTime: string,
  closingTime: string,
  service: Service | undefined
): ValidationResult<ServiceValidated, ValidationError> => {
  if (!service) return err(new ValidationError("Failed to fetch service."));

  const open = DateTime.fromISO(openingTime);
  const closed = DateTime.fromISO(closingTime);

  if (!open.isValid)
    return err(new ValidationError("Opening time is invalid."));
  if (!closed.isValid)
    return err(new ValidationError("Closing time is invalid."));
  if (open.plus({ minutes: service.durationInMinutes }) > closed)
    return err(
      new ValidationError(
        `The time between opening and closing can't fit an appointment`,
        [
          `Opening time: ${open.toFormat("T")}`,
          `Closing time: ${closed.toFormat("T")}`,
          `Appointment length: ${service.durationInMinutes} minutes`,
        ]
      )
    );

  return ok({
    ...service,
    validated: true,
  });
};
