import { z } from "astro:schema";

export const employeeSchema = z.object({
  employeeId: z.string().uuid(),
  name: z.string(),
  photo: z.string().url().optional(),
  title: z.string().optional(),
  role: z.string(),
  location: z.string().uuid(),
  providesServices: z.array(z.string().uuid()),
  nonWorkingDays: z.array(z.string().datetime()),
});
export type Employee = z.infer<typeof employeeSchema>;

export const serviceSchema = z.object({
  serviceId: z.string().uuid(),
  name: z.string(),
  price: z.number(),
  durationInMinutes: z.number(),
  tag: z.string(),
});
export type Service = z.infer<typeof serviceSchema>;
export type ServiceValidated = {
  [K in keyof Service]: Service[K];
} & {
  validated: true;
};

export const locationTypes = [
  "spa",
  "hair-salon",
  "nail-salon",
  "massage-therapy",
  "eyelash-services",
  "waxing-salon",
] as const;

export const locationSchema = z.object({
  locationId: z.string().uuid(),
  openingTime: z.string().datetime(),
  closingTime: z.string().datetime(),
  description: z.string().optional(),
  name: z.string(),
  address: z.string(),
  brandId: z.string().uuid(),
  employees: z.array(employeeSchema),
  services: z.array(serviceSchema),
  photo: z.string().url().optional(),
  locationTypes: z.array(z.enum(locationTypes)),
});
export type Location = z.infer<typeof locationSchema>;

const lightLocationSchema = locationSchema.omit({
  employees: true,
  description: true,
});
export type LocationLight = z.infer<typeof lightLocationSchema>;
export type LocationType = (typeof locationTypes)[number];
export const LocationSearchParamsSchema = z.object({
  name: z.string().optional(),
  opens_at: z.string().optional(),
  closes_at: z.string().optional(),
  location_type: z.enum(locationTypes).optional(),
});
export type LocationSearchParams = z.infer<typeof LocationSearchParamsSchema>;
// export type LocationSearchParams = {
//   name?: string;
//   opens_at?: string;
//   closes_at?: string;
//   location_type?: LocationType;
//   // location_type?: string;
// };

export const brandSchema = z.object({
  id: z.string().uuid(),
  description: z.string().optional(),
  locations: z.array(locationSchema).min(1),
  name: z.string(),
  logo: z.string().url().optional(),
});
export type Brand = z.infer<typeof brandSchema>;

// export const brandSchema = z.object({
//   id: z.string().uuid(),
//   description: z.string().optional(),
//   locations: z.array(lightLocationSchema).min(1),
//   name: z.string(),
//   logo: z.string().url().optional(),
// });
// export type brand = z.infer<typeof brandSchema>;

// export const brandLightSchema = brandSchema
//   .omit({
//     locations: true,
//   })
//   .extend({
//     locations: lightLocationSchema,
//   });
// export type brandLight = z.infer<typeof brandLightSchema>;

export const AppointmentSchema = z.object({
  brandId: z.string().uuid(),
  serviceId: z.string().uuid(),
  employeeId: z.string().uuid(),
  userId: z.string().uuid(),
  datetime: z.string(),
});
export type Appointment = z.infer<typeof AppointmentSchema>;
export type AppointmentPostRequest = Omit<Appointment, "">;

// export const AppointmentPostRequestSchema = z.object({
//   brandId: z.string().uuid(),
//   serviceId: z.string().uuid(),
//   employeeId: z.string().uuid(),
//   userId: z.string().uuid(),
//   datetime: z.string(),
// });
