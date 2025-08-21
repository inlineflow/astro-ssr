import { actions } from "astro:actions";

export const getAddressByLatLng = async ([lat, lng]: [number, number]) => {
  const { data: resp, error } = await actions.nominatim.lookupByLatLng([
    lat,
    lng,
  ]);
};
