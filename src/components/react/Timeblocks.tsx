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

export const TimeBlocks = ({
  className,
  openingTime,
  closingTime,
  intervalInMinutes,
}: TimeblocksProps) => {
  const blocks = [];
  let date = DateTime.fromISO(openingTime);
  const closed = DateTime.fromISO(closingTime);
  console.log("Open : ", date);
  console.log("Closed : ", closed);

  while (date.plus({ minutes: intervalInMinutes }) < closed) {
    blocks.push(date);
    date = date.set({ minute: date.minute + intervalInMinutes });
  }

  console.log("Blocks: ", blocks);

  return (
    <Card
      className={cn(
        "flex-row flex-wrap max-w-full w-70 items-center justify-center md:w-86",
        className
      )}
    >
      {blocks.map((b) => (
        <Button
          onClick={() => console.log(b)}
          key={b.toISO()}
          className="w-24 h-10"
        >
          {b.toFormat("T")}
        </Button>
      ))}
    </Card>
  );
};
