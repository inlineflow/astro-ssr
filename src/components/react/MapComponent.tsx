import { actions } from "astro:actions";
import { LatLng } from "leaflet";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import type { NominatimData } from "src/lib/schema";

export const MapComponent = ({
  selectLocation,
  withAddress,
  setAddress,
}: {
  selectLocation: (location: [number, number]) => void;
  setAddress: (data: NominatimData | string) => void;
  withAddress: boolean;
}) => {
  const center = new LatLng(42.8703, 74.6116);
  return (
    <div className="h-64 w-64">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        className="h-64 w-64"
        id="map"
      >
        <MapResizer />
        <LocationMarker
          center={center}
          selectLocation={selectLocation}
          setAddress={(data) => setAddress(data)}
        />
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

const LocationMarker = ({
  center,
  selectLocation,
}: {
  center: LatLng;
  selectLocation: (location: [number, number]) => void;
}) => {
  const [position, setPosition] = useState<LatLng | null>(center);
  const map = useMapEvents({
    click: async (e) => {
      console.log(e.latlng);
      setPosition(e.latlng);
      selectLocation([e.latlng.lat, e.latlng.lng]);
      // const { data: resp, error } = await actions.nominatim.lookupByLatLng([
      //   e.latlng.lat,
      //   e.latlng.lng,
      // ]);
    },
    // locationfound: (e) => {
    //   setPosition(e.latlng);
    //   console.log(e.latlng);
    // },
  });

  return position !== null ? <Marker position={position}></Marker> : null;
};
