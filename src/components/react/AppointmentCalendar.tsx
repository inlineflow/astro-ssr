import { Calendar } from "@/ui/calendar";
import { Card } from "@/ui/card";
// import { addDays } from "date-fns";
import { useState } from "react";

type AppointmentCalendarProps = {
  openingTime: number;
  intervalInMinutes: number;
} & React.ComponentProps<typeof Calendar>;

export const AppointmentCalendar = ({
  className,
  disabled,
  openingTime,
  intervalInMinutes,
}: AppointmentCalendarProps) => {
  const [date, setDate] = useState(new Date());
  // console.log(disabled);

  const onSelect = (selectedDate: Date) => {
    console.log(`Date: ${selectedDate}`);
    console.log(`Unix timestamp: ${Math.floor(selectedDate.getTime() / 1000)}`);
    setDate(selectedDate);
  };

  return (
    <Card>
      <Calendar
        mode="single"
        // className={className ?? ""}
        className="bg-transparent p-0 [--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
        selected={date}
        defaultMonth={date}
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
  );
};
