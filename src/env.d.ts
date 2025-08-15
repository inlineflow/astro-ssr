/// <reference types="astro/client" />
/// <reference types="vite-plugin-svgr/client" />

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
    // Test properties to verify type declarations work
    testProperty: string;
    testFunction: (message: string) => void;
    testObject: {
      name: string;
      value: number;
    };
  }
}

// declare module "*.svg?react" {
//   import * as React from "react";

//   const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
//   export default ReactComponent;
// }

// This export is required to make this a module
export {};
