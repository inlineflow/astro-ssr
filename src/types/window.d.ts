import type { Marker } from "leaflet";

// Window object type extensions
declare global {
  interface Window {
    marker?: Marker;
    lang?: string;
  }
}

export { };
