/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_MSW_ENABLED: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
