import type { Employee, Service } from "./schema";
import type { Prettify } from "./types";

// export type EmployeeView =
//   | Prettify<
//       Omit<Employee, "providesServices"> & { providesServices: Service[] }
//     >
//   | Record<PropertyKey, never>;
export type EmployeeView = Prettify<
  Omit<Employee, "providesServices"> & { services: Service[] }
>;
// | Record<PropertyKey, never>;
export type ServiceView = Service | Record<PropertyKey, never>;
