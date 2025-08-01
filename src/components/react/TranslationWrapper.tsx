import type { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "src/lib/i18n";

export const TranslationContext = ({
  children,
}: //   lng,
{
  children: ReactNode;
  lng: string;
}) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
