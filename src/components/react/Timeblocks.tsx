import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/ui/toggle-group";
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
      <ToggleGroup
        type="single"
        onValueChange={(val) => console.log(val)}
        className="space-x-5"
      >
        {blockRows.map((bRow, i) => (
          <div className="flex flex-col space-y-5" key={i}>
            {bRow.map((b) => (
              <Timeblock dt={b} key={b.toISO()} onSelect={onSelect} />
            ))}
          </div>
        ))}
      </ToggleGroup>
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
  return (
    <ToggleGroupItem
      value={dt.toISO()!}
      className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 rounded-md data-[state=on]:bg-primary border-8 border-primary data-[state=on]:border-accent data-[state=on]:text-primary"
    >
      <div className="w-24 h-10 flex items-center justify-center">
        {dt.toFormat("T")}
      </div>
    </ToggleGroupItem>
  );
};
