import { actions } from "astro:actions";
import { LatLng, type LeafletMouseEvent } from "leaflet";
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
  onClick,
  markerLocation,
}: {
  withAddress: boolean;
  onClick: (e: LeafletMouseEvent) => void;
  markerLocation: [number, number];
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
          onClick={onClick}
          markerLocation={markerLocation}
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
  onClick,
  markerLocation,
}: {
  center: LatLng;
  onClick: (e: LeafletMouseEvent) => void;
  markerLocation: [number, number];
}) => {
  const map = useMapEvents({
    click: onClick,
  });

  return <Marker position={markerLocation}></Marker>;
};
