/// <reference types="astro/client" />
/// <reference types="vite-plugin-svgr/client" />
// import type { supportedLngs } from "../src/lib/i18n";
type supportedLngs = "en" | "ru" | "ky";

// declare var lang: supportedLngs;
declare global {
  interface Window {
    lang: supportedLngs;
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_MSW_ENABLED: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// declare module "*.svg?react" {
//   import * as React from "react";

//   const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
//   export default ReactComponent;
// }

export {};
