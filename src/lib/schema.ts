import type { ServerConfig } from "astro";
import { z } from "astro:schema";

export const employeeSchema = z.object({
  employeeId: z.string().uuid(),
  name: z.string(),
  photo: z.string().url().optional(),
  title: z.string().optional(),
  location: z.string().uuid(),
  providesServices: z.array(z.string().uuid()),
  nonWorkingDays: z.array(z.string().datetime()),
});
export type Employee = z.infer<typeof employeeSchema>;

export const serviceSchema = z.object({
  name: z.string(),
  serviceId: z.string().uuid(),
  durationInMinutes: z.number(),
});
export type Service = z.infer<typeof serviceSchema>;

export const locationSchema = z.object({
  locationId: z.string().uuid(),
  openingTime: z.string().datetime(),
  closingTime: z.string().datetime(),
  description: z.string().optional(),
  name: z.string(),
  address: z.string(),
  establishmentId: z.string().uuid(),
  employees: z.array(employeeSchema),
  services: z.array(serviceSchema),
  photo: z.string().url().optional(),
});
export type Location = z.infer<typeof locationSchema>;
export type LocationValidated = {
  [K in keyof Location]: Location[K];
} & {
  validated: true;
};

const lightLocationSchema = locationSchema.omit({
  services: true,
  employees: true,
  description: true,
});

export const establishmentSchema = z.object({
  id: z.string().uuid(),
  description: z.string().optional(),
  locations: z.array(lightLocationSchema).min(1),
  name: z.string(),
});
export type Establishment = z.infer<typeof establishmentSchema>;

export const AppointmentSchema = z.object({
  establishmentId: z.string().uuid(),
  serviceId: z.string().uuid(),
  employeeId: z.string().uuid(),
  userId: z.string().uuid(),
  datetime: z.string(),
});
export type Appointment = z.infer<typeof AppointmentSchema>;
export type AppointmentPostRequest = Omit<Appointment, "">;

// export const AppointmentPostRequestSchema = z.object({
//   establishmentId: z.string().uuid(),
//   serviceId: z.string().uuid(),
//   employeeId: z.string().uuid(),
//   userId: z.string().uuid(),
//   datetime: z.string(),
// });
