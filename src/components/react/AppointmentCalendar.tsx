import { cn } from "@/lib/utils";
import { Calendar } from "@/ui/calendar";
import { Card } from "@/ui/card";
import { DateTime } from "luxon";
import type { DayPickerProps, OnSelectHandler } from "react-day-picker";

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
}: AppointmentCalendarProps) => {
  // const [date, setDate] = useState(new Date());
  // console.log(disabled);

  // const handleSelect = (selectedDate: Date) => {
  //   console.log(`Date: ${selectedDate}`);
  //   console.log(`Unix timestamp: ${Math.floor(selectedDate.getTime() / 1000)}`);
  // };

  return (
    <div>
      <input
        type="date"
        name={id}
        id={id}
        value={DateTime.fromJSDate(selected).toISO()!}
        aria-describedby={aridDescribedBy}
        hidden
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
        />
      </Card>
    </div>
  );
};
