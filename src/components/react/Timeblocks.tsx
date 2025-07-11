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
    <div className={cn("flex", className)}>
      {blocks.map((b) => (
        <Card key={b.toISO()}>
          <Button onClick={() => console.log(b)}>{b.toFormat("T")}</Button>
        </Card>
      ))}
    </div>
  );
};
