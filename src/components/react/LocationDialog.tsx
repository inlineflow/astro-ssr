import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { ScrollArea } from "@/ui/scroll-area";
import { Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Location } from "src/lib/schema";
import { ServiceIcons, serviceStyles } from "src/lib/service";

export const LocationDialog = ({
  location,
  isOpen,
  setOpen,
}: {
  location: Location;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog defaultOpen={false} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{location.name}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="w-full h-96 max-w-full max-h-full">
          <LocationDetails location={location} />
        </ScrollArea>
        <DialogFooter>
          <DialogClose
            //  onClick={() => setOpen(false)}
            asChild
          >
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const LocationDetails = ({ location }: { location: Location }) => {
  const { t } = useTranslation();

  const serviceRenderData = location.services.map((ser) => ({
    ...ser,
    iconData: serviceStyles.find((style) => style.tag === ser.tag),
  }));
  return (
    <div className="flex flex-col gap-1">
      <div className="bg-pink-200 w-52 h-52 rounded-xl self-center mb-3" />
      <h3 className="text-center">{t("location.available_services")}</h3>
      {/* <ServiceIcons tags={location.services.map((s) => s.tag)} /> */}
      <ul className="flex flex-wrap gap-x-1 gap-y-2 items-center justify-center">
        {serviceRenderData.map((s) => (
          <li key={s.tag}>
            <Badge className={`${s.iconData?.bgColor} text-primary w-fit`}>
              <p>{t(s.tag)}</p>
              <p>{s.price}KGS</p>
              <p>
                <Clock />
                {s.durationInMinutes}
              </p>
            </Badge>
          </li>
        ))}
        {/* {serviceStyles.map((s) => (
          <Badge className={`${s.bgColor} text-primary w-fit`}>
            {t(s.tag)}
            {s.}
          </Badge>
        ))}
        {serviceStyles.toReversed().map((s) => (
          <Badge className={`${s.bgColor} text-primary w-fit`}>
            {t(s.tag)}
          </Badge>
        ))} */}
      </ul>
      <p>{t("location.employees")}:</p>
      <ul>
        {location.employees.map((e) => (
          <li>
            <p>{e.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
