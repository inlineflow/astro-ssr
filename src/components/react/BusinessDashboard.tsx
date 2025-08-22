import { Button } from "@/ui/button";
import { LocCard } from "components/react/LocationCard";
import i18n from "src/lib/i18n";
import type { Location } from "src/lib/schema";
import "leaflet/dist/leaflet.css";

export const BusinessDashboard = ({
  locations,
  brandId,
}: {
  locations: Location[];
  brandId: string;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <Button asChild>
          <a href={`/${i18n.language}/brand/${brandId}/location/create`}>
            {i18n.t("business_dashboard.add_location")}
          </a>
        </Button>
      </div>
      <ul>
        {locations.map((l) => (
          <li key={l.locationId}>
            <LocCard location={l} onClick={() => console.log("hello world")} />
          </li>
        ))}
      </ul>
    </div>
  );
};
