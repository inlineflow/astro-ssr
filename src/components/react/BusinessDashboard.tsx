import { Button } from "@/ui/button";
import { LocCard } from "components/react/LocationCard";
import i18n from "src/lib/i18n";
import type { Location } from "src/lib/schema";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

export const BusinessDashboard = ({ locations }: { locations: Location[] }) => {
  return (
    <div className="flex flex-col gap-3">
      {/* <div>
        <Button>{i18n.t("business_dashboard.add_location")}</Button>
      </div>
      <ul>
        {locations.map((l) => (
          <li key={l.locationId}>
            <LocCard location={l} />
          </li>
        ))}
      </ul> */}
      {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="w-full"
        ></TileLayer>
      </MapContainer> */}
    </div>
  );
};

export const MapComponent = () => {
  console.log("rendering map component");
  return (
    <div className="h-64 w-64">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-64 w-64"
      >
        <MapResizer />
      </MapContainer>
    </div>
  );
};

const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </>
  );
};
