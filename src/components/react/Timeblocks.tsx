import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { DateTime } from "luxon";
import { useState } from "react";

type TimeblocksProps = {
  className?: string;
  openingTime: string;
  closingTime: string;
  intervalInMinutes: number;
  onSelect?: (dt: DateTime) => void;
};

const makeBlocks = (
  openingTime: string,
  closingTime: string,
  intervalInMinutes: number
) => {
  const blocks = [];
  let date = DateTime.fromISO(openingTime);
  const closed = DateTime.fromISO(closingTime);

  while (date.plus({ minutes: intervalInMinutes }) <= closed) {
    blocks.push(date);
    date = date.set({ minute: date.minute + intervalInMinutes });
  }

  const midpoint = Math.ceil(blocks.length / 2);
  const firstHalf = blocks.slice(0, midpoint);
  const secondHalf = blocks.slice(midpoint);
  const result = [firstHalf, secondHalf];

  return result;
};

export const TimeBlocks = ({
  className,
  openingTime,
  closingTime,
  intervalInMinutes,
  onSelect,
}: TimeblocksProps) => {
  const blockRows = makeBlocks(openingTime, closingTime, intervalInMinutes);

  return (
    <Card
      className={cn(
        "flex-row flex-wrap max-w-full w-70 items-center justify-center md:w-86 px-4",
        className
      )}
    >
      {blockRows.map((bRow, i) => (
        <div className="flex flex-col space-y-5" key={i}>
          {bRow.map((b) => (
            <Timeblock dt={b} key={b.toISO()} onSelect={onSelect} />
          ))}
        </div>
      ))}
    </Card>
  );
};

const Timeblock = ({
  dt,
  onSelect,
}: {
  dt: DateTime;
  onSelect?: TimeblocksProps["onSelect"];
}) => {
  const defaultClassName = ["w-24 h-10"];
  // className = "border-red-500";
  const borderClassName = "border-8 border-red-500";
  const [className, setClassName] = useState(defaultClassName);

  const handleClick = () => {
    if (className.includes(borderClassName)) return;

    setClassName([...className, borderClassName]);
    if (onSelect) onSelect(dt);
  };

  return (
    <div>
      <Button
        type="button"
        onClick={() => handleClick()}
        className={className.join(" ")}
      >
        {dt.toFormat("T")}
      </Button>
    </div>
  );
};
