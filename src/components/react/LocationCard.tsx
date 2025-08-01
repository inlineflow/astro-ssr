import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
// import ServiceIcons from "components/astro/service-icons.astro";
import { Clock, MapPin } from "lucide-react";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import type { Location, LocationLight } from "src/lib/schema";
import { commonContainerClasses, serviceStyles } from "src/lib/service";

export const LocCard = ({
  location,
  onClick,
}: {
  location: LocationLight;
  onClick?: (open: boolean) => void;
}) => {
  const open = DateTime.fromISO(location.openingTime);
  const close = DateTime.fromISO(location.closingTime);
  const availableServicesIcons = serviceStyles.filter((i) =>
    location.services.map((s) => s.tag).includes(i.tag)
  );

  const { t } = useTranslation();

  return (
    <Card
      className="text-center px-4 py-4 h-full"
      onClick={() => onClick && onClick(true)}
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
          <div className="bg-primary/20 w-52 h-52 rounded-xl self-center" />
          // )
        }
        <div className="divider bg-border h-0.5 my-1 w-full"></div>
        <div className="flex">
          <div>
            <p>
              {location.services.length}
              &ensp;
              {t("services")}
            </p>
          </div>
        </div>
        {/* <div className="flex space-x-2">
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
        </div> */}
      </CardContent>
      <CardFooter className="gap-1 px-0 min-h-fit h-4 flex-col md:flex md:gap-1 mt-auto">
        <div className="divider bg-border h-0.5 my-1"></div>
        <div className="flex w-full">
          <div className="flex gap-2 w-full">
            <Clock />
            <div className="flex w-full gap-x-3 justify-center text-nowrap">
              {/* {`${open.toFormat("T")} — ${close.toFormat("T")}`} */}
              {/* <p>{`${open.toFormat("T")}${close.toFormat("T")}`}</p> */}
              <p>{open.toFormat("T")}</p>
              <p> — </p>
              <p>{close.toFormat("T")}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 shrink w-full">
          <MapPin className="size-6 shrink-0" />
          <p className="m-auto text-sm">{location.address}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
