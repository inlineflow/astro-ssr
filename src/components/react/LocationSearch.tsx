import { Card } from "@/ui/card";
import { Input } from "@/ui/input";
// import LocationCard from "components/astro/location-card.astro";
import type { Location } from "src/lib/schema";
import { serviceStyles } from "src/lib/service";
import { LocCard } from "./LocationCard";

export const LocationSearch = ({ locations }: { locations: Location[] }) => {
  return (
    <div className="flex flex-col gap-5">
      <Input />
      <Card className="px-3 py-3">
        <ul className="flex gap-3">
          {serviceStyles.map((s) => (
            <li className={`${s.bgColor} p-2 rounded-lg`} key={s.tag}>
              <s.Icon className="size-8" />
            </li>
          ))}
        </ul>
      </Card>
      <Card className="px-3 py-3 bg-pink-50">
        {locations && (
          <ul className="flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-3 lg:grid-cols-4">
            {locations.map((loc) => (
              <li key={loc.locationId}>
                <LocCard location={loc} key={loc.locationId} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};
