import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  LocationEditFormSchema,
  type Location,
  type LocationEditFormValues,
} from "src/lib/schema";

export const LocationEditForm = ({ location }: { location: Location }) => {
  console.log("i've rendered");
  const form = useForm<LocationEditFormValues>({
    resolver: zodResolver(LocationEditFormSchema),
    defaultValues: {
      address: location.address,
      name: location.name,
      services: location.services,
      type: location.locationTypes,
    },
  });
  return (
    <div>
      <p>{location.name}</p>
    </div>
  );
};
