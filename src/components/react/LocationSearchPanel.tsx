import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/ui/sheet";
import { useTranslation } from "react-i18next";
import { locationTypes } from "src/lib/schema";

export const LocationSearchPanel = () => {
  const { t } = useTranslation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">{t("search")}</Button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          {t("search.title")}
          <SheetDescription>{t("search.description")}</SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <LocationSearch />
        </div>
        <SheetFooter>footer</SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const LocationSearch = () => {
  const { t } = useTranslation();
  const slots = Array.from({ length: 23 }, (_, i) => `${i}:00`);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Label>{t("search.location_name")}</Label>
        <Input />
      </div>
      <Card className="px-4">
        <Label>{t("search.working_hours")}</Label>
        <div className="flex w-full max-w-sm items-center gap-3">
          <div className="flex flex-col gap-3">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t("search.opening_time")} />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {slots.map((s) => (
                  <SelectItem value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t("search.closing_time")} />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {slots.map((s) => (
                  <SelectItem value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
      <div className="flex flex-col gap-1 w-full">
        <Label>{t("search.location_type")}</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("search.location_type")} />
          </SelectTrigger>
          <SelectContent>
            {locationTypes.map((t) => (
              <SelectItem value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button>Submit</Button>
    </div>
  );
  // Working time from and to
  // Name
  // Long-Term Feature search within radius on map
  // location type
  // maybe services
  // maybe employees
};
