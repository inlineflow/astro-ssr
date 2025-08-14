import { LocCard } from "components/react/LocationCard";
import type { Location } from "src/lib/schema";

export const BusinessDashboard = ({ locations }: { locations: Location[] }) => {
  return (
    <div>
      {locations.map((l) => (
        <LocCard location={l} />
      ))}
    </div>
  );
};
