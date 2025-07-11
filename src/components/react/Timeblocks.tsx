import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { DateTime } from "luxon";

type TimeblocksProps = {
  className?: string;
  openingTime: string;
  closingTime: string;
  intervalInMinutes: number;
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
}: TimeblocksProps) => {
  const blockRows = makeBlocks(openingTime, closingTime, intervalInMinutes);

  return (
    <Card
      className={cn(
        "flex-row flex-wrap max-w-full w-70 items-center justify-center md:w-86 px-4",
        className
      )}
    >
      {blockRows.map((bRow) => (
        <div className="flex flex-col space-y-5">
          {bRow.map((b) => (
            <Button
              onClick={() => console.log(b)}
              key={b.toISO()}
              className="w-24 h-10"
            >
              {b.toFormat("T")}
            </Button>
          ))}
        </div>
      ))}
    </Card>
  );
};
