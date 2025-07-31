import { cn } from "@/lib/utils";
import { Calendar } from "@/ui/calendar";
import { Card } from "@/ui/card";
import { DateTime } from "luxon";
import type { DayPickerProps, OnSelectHandler } from "react-day-picker";
import { enGB, ru } from "react-day-picker/locale";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { capitalize } from "src/lib/utils";

const locales = {
  ru: ru,
  en: enGB,
  kg: ru,
};

type AppointmentCalendarProps = {
  className?: string;
  disabled?: DayPickerProps["disabled"];
  selected?: Date;
  onSelect?: OnSelectHandler<Date>;
  id?: string;
  aridDescribedBy?: string;
};

export const AppointmentCalendar = ({
  className,
  disabled,
  selected = new Date(),
  onSelect = () => {},
  id,
  aridDescribedBy,
}: // locale,
AppointmentCalendarProps) => {
  const locale = useTranslation().i18n.language as "ru" | "en" | "kg";

  return (
    <div>
      <input
        type="date"
        name={id}
        id={id}
        value={DateTime.fromJSDate(selected).toISO()!}
        aria-describedby={aridDescribedBy}
        hidden
        readOnly
      />
      <Card className={cn("size-fit", className)}>
        <Calendar
          mode="single"
          // className={className ?? ""}
          className="bg-transparent p-0 [--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
          selected={selected}
          defaultMonth={selected}
          showOutsideDays={false}
          modifiers={{ booked: disabled }}
          modifiersClassNames={{
            booked: "[&>button]:line-through opacity-100",
          }}
          onSelect={onSelect}
          captionLayout="dropdown"
          required
          disabled={disabled}
          locale={locales[locale]}
          formatters={{
            formatWeekdayName: (day) => {
              const name = capitalize(
                format(day, "EEEEEE", { locale: locales[locale] })
              );
              return name;
            },
          }}
        />
      </Card>
    </div>
  );
};
