import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import {
  Dialog,
  // DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { ScrollArea } from "@/ui/scroll-area";
import { Clock } from "lucide-react";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import type { Location } from "src/lib/schema";
import { serviceStyles } from "src/lib/service";

export const LocationDialog = ({
  location,
  isOpen,
  setOpen,
}: {
  location: Location;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { i18n } = useTranslation();
  console.log("i18n language", i18n.language);
  const { t } = useTranslation();

  return (
    <Dialog defaultOpen={false} open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="[&>[data-slot=dialog-close]>svg]:size-6">
        <DialogHeader>
          <DialogTitle>{location.name}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="w-full h-96 max-w-full max-h-full">
          <LocationDetails location={location} />
        </ScrollArea>
        <DialogFooter>
          {/* <DialogClose
            //  onClick={() => setOpen(false)}
            asChild
          >
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogClose> */}
          <Button asChild>
            <a
              href={`/${i18n.language}/location/${location.locationId}`}
              className=""
            >
              {t("location.nav_appointment")}
              {/* Make an appointment */}
            </a>
          </Button>
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
      {/* <h3 className="text-center">{t("location.available_services")}</h3> */}
      {/* <ServiceIcons tags={location.services.map((s) => s.tag)} /> */}
      <Accordion type="multiple">
        {/* className="flex flex-col max-w-fit self-center"> */}
        <AccordionItem value="services">
          <AccordionTrigger className="w-full px-4 border-none outline-0 focus-visible:ring-0">
            {/* // className="border-none flex outline-0 self-center"> */}
            {t("services")}
            {/* <ChevronDown /> */}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap max-w-full self-center">
              <ul className="flex flex-col gap-x-1 gap-y-2 items-center justify-center w-full">
                {serviceRenderData.map((s) => (
                  <li key={s.tag} className="w-full">
                    <Badge
                      className={`${s.iconData?.bgColor} text-primary w-full text-lg justify-between px-4 font-semibold`}
                    >
                      <p>{t(s.tag)}</p>
                      <p>{s.price}KGS</p>
                      <p className="flex items-center gap-[2px]">
                        <Clock size={16} />
                        {s.durationInMinutes}
                      </p>
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="employees">
          <AccordionTrigger className="w-full px-4 border-none outline-0 focus-visible:ring-0">
            {t("employees")}
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-x-1 gap-y-2 items-center justify-center w-full">
              {location.employees.map((emp) => (
                <li key={emp.employeeId} className="w-full text-center py-2 ">
                  <Card>
                    <div className="flex flex-col items-center pt-2">
                      {/* <img src={emp.photo} alt={`${t("employee.photo")}`} /> */}
                      <div className="size-24 bg-primary/10 rounded-md mb-2"></div>
                      <p>{t(`employee.role.${emp.role}`)}</p>
                      <p>{emp.name}</p>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex gap-x-2 justify-center">
        <p>{t("location.working_hours")}:</p>
        <p>
          {`${DateTime.fromISO(location.openingTime).toFormat(
            "T"
          )} - ${DateTime.fromISO(location.closingTime).toFormat("T")}`}
        </p>
      </div>
      <div className="flex gap-x-2 justify-center">
        <p>{t("location.address")}:</p>
        <p>{location.address}</p>
      </div>
    </div>
  );
};
