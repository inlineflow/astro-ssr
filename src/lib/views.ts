import type { Employee, Service } from "./schema";

export type EmployeeView = Employee | Record<PropertyKey, never>;
export type ServiceView = Service | Record<PropertyKey, never>;
