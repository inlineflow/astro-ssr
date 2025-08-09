import type { APIContext, MiddlewareNext } from "astro";
import i18n from "src/lib/i18n";

export async function onRequest(context: APIContext, next: MiddlewareNext) {
  const locale = context.currentLocale;
  await i18n.changeLanguage(locale);

  return next();
}
