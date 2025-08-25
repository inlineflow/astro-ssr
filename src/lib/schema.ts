import { z } from "astro:schema";
import i18n from "./i18n";

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

export const LocationType = typeof locationTypes;
export type LocationMetadata = {
  serviceName: string;
  locationName: string;
  brandName: string;
  price: number;
  durationInMinutes: number;
  tag: string;
};

export const locationTypeToServices: Record<LocationType, LocationMetadata[]> =
  {
    "hair-salon": [
      {
        serviceName: "Бритье горячим полотенцем",
        locationName: "Мужской Кабинет",
        brandName: "Барбершоп «Лезвие»",
        price: 600,
        durationInMinutes: 30,
        tag: "beard-shave",
      },
      {
        serviceName: "Маникюр",
        locationName: "Шарм Центр",
        brandName: "Салон Красоты «Шарм»",
        price: 750,
        durationInMinutes: 45,
        tag: "nail-polish",
      },
      {
        serviceName: "Мужская стрижка",
        locationName: "Мужской Кабинет",
        brandName: "Барбершоп «Лезвие»",
        price: 800,
        durationInMinutes: 45,
        tag: "hairdressing",
      },
      {
        serviceName: "Окрашивание и мелирование",
        locationName: "Наследие Красоты Центр",
        brandName: "Салон «Наследие Красоты»",
        price: 3500,
        durationInMinutes: 180,
        tag: "hairdressing",
      },
      {
        serviceName: "Пакет «Уход за лицом и массаж»",
        locationName: "Бьюти Перекресток",
        brandName: "Салон и Спа «Бьюти Хаб»",
        price: 3800,
        durationInMinutes: 120,
        tag: "bundle",
      },
      {
        serviceName: "Педикюр",
        locationName: "Шарм Центр",
        brandName: "Салон Красоты «Шарм»",
        price: 1000,
        durationInMinutes: 30,
        tag: "pedicure",
      },
      {
        serviceName: "Полное преображение",
        locationName: "Бьюти Перекресток",
        brandName: "Салон и Спа «Бьюти Хаб»",
        price: 5000,
        durationInMinutes: 150,
        tag: "makeup",
      },
      {
        serviceName: "Стрижка и укладка",
        locationName: "Шарм Центр",
        brandName: "Салон Красоты «Шарм»",
        price: 650,
        durationInMinutes: 60,
        tag: "hairdressing",
      },
      {
        serviceName: "Укладка феном",
        locationName: "Наследие Красоты Центр",
        brandName: "Салон «Наследие Красоты»",
        price: 500,
        durationInMinutes: 45,
        tag: "hairdressing",
      },
    ],
    "nail-salon": [
      {
        serviceName: "Гель-маникюр",
        locationName: "Ажур на Высоте",
        brandName: "Ногтевая Студия «Ажур»",
        price: 900,
        durationInMinutes: 60,
        tag: "nail-polish",
      },
      {
        serviceName: "Маникюр",
        locationName: "Шарм Центр",
        brandName: "Салон Красоты «Шарм»",
        price: 750,
        durationInMinutes: 45,
        tag: "nail-polish",
      },
      {
        serviceName: "Пакет «Уход за лицом и массаж»",
        locationName: "Бьюти Перекресток",
        brandName: "Салон и Спа «Бьюти Хаб»",
        price: 3800,
        durationInMinutes: 120,
        tag: "bundle",
      },
      {
        serviceName: "Педикюр",
        locationName: "Шарм Центр",
        brandName: "Салон Красоты «Шарм»",
        price: 1000,
        durationInMinutes: 30,
        tag: "pedicure",
      },
      {
        serviceName: "Педикюр",
        locationName: "Ажур на Высоте",
        brandName: "Ногтевая Студия «Ажур»",
        price: 1200,
        durationInMinutes: 75,
        tag: "nail-polish",
      },
      {
        serviceName: "Полное преображение",
        locationName: "Бьюти Перекресток",
        brandName: "Салон и Спа «Бьюти Хаб»",
        price: 5000,
        durationInMinutes: 150,
        tag: "makeup",
      },
      {
        serviceName: "Стрижка и укладка",
        locationName: "Шарм Центр",
        brandName: "Салон Красоты «Шарм»",
        price: 650,
        durationInMinutes: 60,
        tag: "hairdressing",
      },
    ],
    spa: [
      {
        serviceName: "Глубокая чистка лица",
        locationName: "Спа в Центре Города",
        brandName: "Спа-Центр «Сияющая Кожа»",
        price: 2500,
        durationInMinutes: 90,
        tag: "skincare",
      },
      {
        serviceName: "Микродермабразия",
        locationName: "Спа в Центре Города",
        brandName: "Спа-Центр «Сияющая Кожа»",
        price: 3000,
        durationInMinutes: 60,
        tag: "skincare",
      },
      {
        serviceName: "Пакет «Уход за лицом и массаж»",
        locationName: "Бьюти Перекресток",
        brandName: "Салон и Спа «Бьюти Хаб»",
        price: 3800,
        durationInMinutes: 120,
        tag: "bundle",
      },
      {
        serviceName: "Полное преображение",
        locationName: "Бьюти Перекресток",
        brandName: "Салон и Спа «Бьюти Хаб»",
        price: 5000,
        durationInMinutes: 150,
        tag: "makeup",
      },
      {
        serviceName: "Скраб для тела",
        locationName: "Убежище Релакса",
        brandName: "Спа «Безмятежность»",
        price: 1500,
        durationInMinutes: 45,
        tag: "spa-treatment",
      },
      {
        serviceName: "Шведский массаж",
        locationName: "Убежище Релакса",
        brandName: "Спа «Безмятежность»",
        price: 1800,
        durationInMinutes: 60,
        tag: "massage",
      },
    ],
    "eyelash-services": [
      {
        serviceName: "Ламинирование бровей",
        locationName: "Центр Ресниц и Бровей",
        brandName: "Студия Ресниц и Бровей «Взгляд»",
        price: 1500,
        durationInMinutes: 60,
        tag: "eyebrow-lamination",
      },
      {
        serviceName: "Наращивание ресниц",
        locationName: "Центр Ресниц и Бровей",
        brandName: "Студия Ресниц и Бровей «Взгляд»",
        price: 2000,
        durationInMinutes: 120,
        tag: "eyelash-extensions",
      },
      {
        serviceName: "Пакет «Уход за лицом и массаж»",
        locationName: "Бьюти Перекресток",
        brandName: "Салон и Спа «Бьюти Хаб»",
        price: 3800,
        durationInMinutes: 120,
        tag: "bundle",
      },
      {
        serviceName: "Полное преображение",
        locationName: "Бьюти Перекресток",
        brandName: "Салон и Спа «Бьюти Хаб»",
        price: 5000,
        durationInMinutes: 150,
        tag: "makeup",
      },
    ],
    "massage-therapy": [
      {
        serviceName: "Глубокий массаж тканей",
        locationName: "Оздоровительный Отдых",
        brandName: "Массаж и Велнес «Нежное Прикосновение»",
        price: 2200,
        durationInMinutes: 75,
        tag: "nassage",
      },
      {
        serviceName: "Массаж горячими камнями",
        locationName: "Оздоровительный Отдых",
        brandName: "Массаж и Велнес «Нежное Прикосновение»",
        price: 2500,
        durationInMinutes: 90,
        tag: "nassage",
      },
      {
        serviceName: "Скраб для тела",
        locationName: "Убежище Релакса",
        brandName: "Спа «Безмятежность»",
        price: 1500,
        durationInMinutes: 45,
        tag: "spa-treatment",
      },
      {
        serviceName: "Шведский массаж",
        locationName: "Убежище Релакса",
        brandName: "Спа «Безмятежность»",
        price: 1800,
        durationInMinutes: 60,
        tag: "massage",
      },
    ],
    "waxing-salon": [
      {
        serviceName: "Восковая депиляция бровей",
        locationName: "Центр Депиляции",
        brandName: "Студия Депиляции «Шелк»",
        price: 400,
        durationInMinutes: 15,
        tag: "waxing",
      },
      {
        serviceName: "Восковая депиляция ног",
        locationName: "Центр Депиляции",
        brandName: "Студия Депиляции «Шелк»",
        price: 1000,
        durationInMinutes: 60,
        tag: "waxing",
      },
    ],
  };
const h = Object.values(locationTypeToServices)
  .map((l) => l.map((x) => x.serviceName))
  .flat();

const geodataSchema = z.object({
  house_number: z
    .string()
    .min(1, { message: i18n.t("validation.address.empty_house_number") }),
  road: z.string().min(1, { message: i18n.t("validation.address.empty_road") }),
  city_district: z
    .string()
    .min(1, { message: i18n.t("validation.address.empty_city_district") }),
  city: z.string().min(1, { message: i18n.t("validation.address.empty_city") }),
  "ISO3166-2-lvl4": z
    .string()
    .min(1, { message: i18n.t("validation.address.empty_iso3166-2") }),
  postcode: z
    .string()
    .min(1, { message: i18n.t("validation.address.empty_postcode") }),
  country: z
    .string()
    .min(1, { message: i18n.t("validation.address.empty_country") }),
  country_code: z
    .string()
    .min(1, { message: i18n.t("validation.address.empty_country_code") }),
});

export const locationSchema = z.object({
  locationId: z.string().uuid(),
  openingTime: z.string().datetime(),
  closingTime: z.string().datetime(),
  description: z.string().optional(),
  name: z.string(),
  geodata: z.object({
    lat: z.string(),
    lon: z.string(),
    address: geodataSchema,
  }),
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

// export type NominatimData = {
//   lat: string;
//   lon: string;
//   address: {
//     house_number: string;
//     road: string;
//     city_district: string;
//     city: string;
//     "ISO3166-2-lvl4": string;
//     postcode: string;
//     country: string;
//     country_code: string;
//   };
// };
export type NominatimData = Location["geodata"];
// type NominatimAddressInfo = {
//   house_number: string;
//   road: string;
//   city_district: string;
//   city: string;
//   "ISO3166-2-lvl4": string;
//   postcode: string;
//   country: string;
//   country_code: string;
// };
export type NominatimFullData = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: z.infer<typeof geodataSchema>;
  boundingbox: string[];
};

export const LocationCreateFormSchema = z.object({
  name: z.string().min(1, { message: i18n.t("form.location_name_empty") }),
  type: z.array(
    z.enum(locationTypes, {
      message: i18n.t("form.location_type_unknown"),
    })
  ),
  services: z
    .array(
      z.object({
        serviceId: z.string().uuid(),
        serviceName: z.string(),
      })
    )
    .min(1, { message: i18n.t("form.services_empty") }),
  geodata: geodataSchema,
});

export type LocationCreateFormValues = z.infer<typeof LocationCreateFormSchema>;

export const LocationEditFormSchema = LocationCreateFormSchema;
export type LocationEditFormValues = z.infer<typeof LocationEditFormSchema>;
// export const AppointmentPostRequestSchema = z.object({
//   brandId: z.string().uuid(),
//   serviceId: z.string().uuid(),
//   employeeId: z.string().uuid(),
//   userId: z.string().uuid(),
//   datetime: z.string(),
// });
