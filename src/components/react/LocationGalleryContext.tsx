import { createContext, useContext, useState } from "react";
import type { Location } from "src/lib/schema";

const LocationGalleryContext = createContext<{
  locations: Location[],
  setLocations: (locs: Location[]) => void,
}>({ locations: [] as Location[], setLocations: () => { } })

export const LocationGalleryProvider = ({ locations: initialLocations, children }: { locations: Location[], children: React.ReactNode }) => {
  const [locations, setLocations] = useState(initialLocations);
  const value = { locations, setLocations };

  return (
    <LocationGalleryContext.Provider value={value}>
      {children}
    </LocationGalleryContext.Provider>
  );
}

export const UseLocationGalleryData = () => useContext(LocationGalleryContext);
