/**
 * Extracts UUID
 * Example: http://localhost:4321/ru/brand/a1b2c3d4-e5f6-7890-1234-567890abcdef/location/create
 * for this URL and key 'brand' it would extract 'a1b2c3d4-e5f6-7890-1234-567890abcdef'
 * @param urlRaw
 * @param key
 * @returns
 */
export const extractUUID = (urlRaw: string | URL, key: string) => {
  let url;
  if (typeof urlRaw === "string") {
    url = new URL(urlRaw);
  } else {
    url = urlRaw;
  }
  //   const url = new URL(urlRaw);
  const parts = url.pathname.split("/");
  let result = undefined;

  const keyIndex = parts.indexOf(key);
  if (keyIndex !== -1) {
    result = parts[keyIndex + 1];
  }

  return result;
};
