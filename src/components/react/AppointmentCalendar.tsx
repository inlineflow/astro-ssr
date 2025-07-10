import { Calendar } from "@/ui/calendar";
import { useState } from "react";

type AppointmentCalendarProps = React.ComponentProps<typeof Calendar>;

export const AppointmentCalendar = ({
  className,
  disabled,
}: AppointmentCalendarProps) => {
  const [date, setDate] = useState(new Date());
  return (
    <Calendar
      mode="single"
      className={className ?? ""}
      selected={date}
      onSelect={setDate}
      captionLayout="dropdown"
      required
      disabled={disabled}
    />
  );
};
