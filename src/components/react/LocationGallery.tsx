import { Card } from "@/ui/card";
// import { Input } from "@/ui/input";
// import LocationCard from "components/astro/location-card.astro";
import type { Location } from "src/lib/schema";
import { serviceStyles } from "src/lib/service";
import { LocCard } from "./LocationCard";
import { useState } from "react";
// import { Dialog, DialogContent } from "@/ui/dialog";
import { LocationDialog } from "./LocationDialog";
import { I18nextProvider } from "react-i18next";
import i18n from "src/lib/i18n";
import { LocationSearchPanel } from "./LocationSearchPanel";
import { LocationGalleryProvider, UseLocationGalleryData } from "./LocationGalleryContext";
export const LocationGallery = ({ locations }: { locations: Location[] }) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({} as Location);

  return (
    <I18nextProvider i18n={i18n}>
      <LocationGalleryProvider locations={locations}>
        <div className="flex flex-col gap-5">
          {/* <Input /> */}
          <LocationSearchPanel />
          <Card className="px-3 py-3">
            <ul className="flex gap-3">
              {serviceStyles.map((s) => (
                <li className={`${s.bgColor} p-2 rounded-lg`} key={s.tag}>
                  <s.Icon className="size-8" />
                </li>
              ))}
            </ul>
          </Card>
          {/* <Card className="px-3 py-3"> */}
          {locations && <LocationGrid setOpen={setOpen} setSelectedLocation={setSelectedLocation} />}
          {/* </Card> */}
          <LocationDialog
            isOpen={isOpen}
            location={selectedLocation}
            setOpen={setOpen}
          />
        </div>
      </LocationGalleryProvider>
    </I18nextProvider>
  );
};

const LocationGrid = ({ setSelectedLocation, setOpen }: { setSelectedLocation: (l: Location) => void, setOpen: (b: boolean) => void }) => {
  const { locations } = UseLocationGalleryData();

  return (
    <ul className="flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-3 lg:grid-cols-4">
      {locations.map((loc) => (
        <li key={loc.locationId}>
          <LocCard
            location={loc}
            key={loc.locationId}
            onClick={() => {
              setSelectedLocation(loc);
              setOpen(true);
            }}
          />
        </li>
      ))}
    </ul>
  )
}
