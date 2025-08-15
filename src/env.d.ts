/// <reference types="astro/client" />
/// <reference types="vite-plugin-svgr/client" />

import { Marker } from "leaflet";

declare global {
  interface Window {
    marker: Marker<any>;
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_MSW_ENABLED: string;
  readonly API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Global declarations for window object
declare global {
  interface Window {
    // Add your custom properties here
    // Example:
    // myCustomProperty: string;
    // myCustomFunction: () => void;
  }
}

// declare module "*.svg?react" {
//   import * as React from "react";

//   const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
//   export default ReactComponent;
// }

export {};
