import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import ServiceIcons from "components/astro/service-icons.astro";
import { Clock, MapPin } from "lucide-react";
import { DateTime } from "luxon";
import type { Location, LocationLight } from "src/lib/schema";
import { commonContainerClasses, serviceStyles } from "src/lib/service";

export const LocCard = ({ location }: { location: LocationLight }) => {
  const open = DateTime.fromISO(location.openingTime);
  const close = DateTime.fromISO(location.closingTime);
  const availableServicesIcons = serviceStyles.filter((i) =>
    location.services.map((s) => s.tag).includes(i.tag)
  );

  return (
    <Card
      className="text-center px-4 py-4 h-full"
      onClick={() => console.log("i've been clicked")}
    >
      <CardHeader>
        <CardTitle>{location.name}</CardTitle>
      </CardHeader>
      <div className="divider bg-border h-0.5 my-1"></div>
      <CardContent className="flex flex-col px-0 gap-2">
        {
          // location.photo ? (
          //   <img src={location.photo} />
          // ) : (
          <div className="bg-pink-200 w-52 h-52 rounded-xl self-center" />
          // )
        }
        <div className="divider bg-border h-0.5 my-1 w-full"></div>
        <div className="flex space-x-2">
          {
            availableServicesIcons.map((i) => (
              <div
                key={i.tag}
                className={cn(
                  [...commonContainerClasses, ...i.classList, i.bgColor].join(
                    " "
                  ),
                  "size-12 md:size-12"
                )}
              >
                <i.Icon className="size-8 md:size-8" />
              </div>
            ))
            // <ServiceIcons services={location.services} size={20} />
            // location.services && (
            //   <div>
            //     {location.services.map((_s) => (
            //       <div class="bg-amber-100 size-12 rounded-full" />
            //     ))}
            //   </div>
            // )
          }
        </div>
      </CardContent>
      <CardFooter className="items-center gap-1 px-0 min-h-fit h-4 flex-col md:flex md:gap-0 mt-auto">
        <div className="divider bg-border h-0.5 my-1"></div>
        <div className="flex">
          <div className="flex gap-2 justify-center items-center">
            <Clock />
            <p className="text-nowrap">
              {`${open.toFormat("T")} — ${close.toFormat("T")}`}
            </p>
          </div>
        </div>
        <div className="flex space-x-1 shrink justify-center items-center">
          <MapPin className="size-6 shrink-0" />
          <p className="">{location.address}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
