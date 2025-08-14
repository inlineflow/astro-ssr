import { actions } from "astro:actions";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/ui/sheet";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { apiUrl } from "src/env";
import {
  locationTypes,
  type Location,
  type LocationSearchParams,
  type LocationType,
} from "src/lib/schema";
import { UseLocationGalleryData } from "./LocationGalleryContext";

export const LocationSearchPanel = () => {
  const { t } = useTranslation();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">{t("search")}</Button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          {t("search.title")}
          <SheetDescription>{t("search.description")}</SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <LocationSearch setSheetOpen={setSheetOpen} />
        </div>
        <SheetFooter>footer</SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const fetchNewLocations = async (
  params: LocationSearchParams,
  setLocations: (l: Location[]) => void
) => {
  const { data, error } = await actions.location.searchLocations(params);
  if (error) {
    console.log("Error when searching for actions, params: ", params);
    return;
  }
  // const resp = await fetch(`${apiUrl}/location/search`, {
  //   body: JSON.stringify(params),
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  // });
  // const result = await resp.json();
  setLocations(data);
};

// const fetchNewLocations = async (
//   params: LocationSearchParams,
//   locations: Location[],
//   setLocations: (l: Location[]) => void
// ) => {
//   const res = locations.filter((l) => l.name === params.name);
//   console.log(res);
//   setLocations(res);
// };

const LocationSearch = ({
  setSheetOpen,
}: {
  setSheetOpen: (b: boolean) => void;
}) => {
  const { setLocations } = UseLocationGalleryData();
  const { t } = useTranslation();
  const slots = Array.from({ length: 23 }, (_, i) => `${i}:00`);
  const [params, setParams] = useState<LocationSearchParams>({});

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Label>{t("search.location_name")}</Label>
        <Input
          onChange={(ev) => setParams({ ...params, name: ev.target.value })}
          value={params.name}
        />
      </div>
      <Card className="px-4">
        <Label>{t("search.working_hours")}</Label>
        <div className="flex w-full max-w-sm items-center gap-3">
          <div className="flex flex-col gap-3">
            <Select
              onValueChange={(opens_at) =>
                setParams({ ...params, opens_at: opens_at })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={t("search.opening_time")} />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {slots.map((s) => (
                  <SelectItem value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <Select
              onValueChange={(closes_at) =>
                setParams({ ...params, closes_at: closes_at })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={t("search.closing_time")} />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {slots.map((s) => (
                  <SelectItem value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
      <div className="flex flex-col gap-1 w-full">
        <Label>{t("search.location_type")}</Label>
        <Select
          onValueChange={(location_type) =>
            setParams({
              ...params,
              location_type: location_type as LocationType,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("search.location_type")} />
          </SelectTrigger>
          <SelectContent>
            {locationTypes.map((t) => (
              <SelectItem value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={() => {
          fetchNewLocations(params, setLocations);
          setSheetOpen(false);
        }}
      >
        Submit
      </Button>
    </div>
  );
  // Working time from and to
  // Name
  // Long-Term Feature search within radius on map
  // location type
  // maybe services
  // maybe employees
};
