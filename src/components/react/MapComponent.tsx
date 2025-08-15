import { LatLng } from "leaflet";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

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
        id="map"
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
