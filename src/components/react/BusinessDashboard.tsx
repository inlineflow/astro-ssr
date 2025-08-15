import { Button } from "@/ui/button";
import { LocCard } from "components/react/LocationCard";
import i18n from "src/lib/i18n";
import type { Location } from "src/lib/schema";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { LatLng, type LatLngTuple } from "leaflet";

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
  // const center: LatLngTuple = [42.8703, 74.6116];
  const center = new LatLng(42.8703, 74.6116);
  return (
    <div className="h-64 w-64">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        className="h-64 w-64"
      >
        <MapResizer />
        <LocationMarker center={center} />
      </MapContainer>
    </div>
  );
};

const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </>
  );
};

const LocationMarker = ({ center }: { center: LatLng }) => {
  const [position, setPosition] = useState<LatLng | null>(center);
  const map = useMapEvents({
    click: (e) => {
      console.log(e.latlng);
      setPosition(e.latlng);
    },
    // locationfound: (e) => {
    //   setPosition(e.latlng);
    //   console.log(e.latlng);
    // },
  });

  return position !== null ? <Marker position={position}></Marker> : null;
};
