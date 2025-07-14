import { DateTime } from "luxon";
import type { Service } from "root/src/types";
import type { ServiceValidated } from "root/src/types";
import { err, ok, type Result } from "../result";

type ValidationResult<T, E> = Result<T, E>;
export const validateService = (
  service: Service
): ValidationResult<ServiceValidated, Error> => {
  const open = DateTime.fromISO(service.openingTime);
  const closed = DateTime.fromISO(service.closingTime);

  if (!open.isValid) return err(new Error("Opening time is invalid."));
  if (!closed.isValid) return err(new Error("Closing time is invalid."));
  if (open.plus({ minutes: service.intervalInMinutes }) > closed)
    return err(
      new Error("The time between opening and closing can't fit an appointment")
    );

  return ok({
    openingTime: open,
    closingTime: closed,
    intervalInMinutes: service.intervalInMinutes,
  });
};
