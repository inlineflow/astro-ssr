import { cn } from "@/lib/utils";
import { Card } from "@/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/ui/toggle-group";
import { DateTime } from "luxon";
import type { ServiceValidated } from "root/src/types";

type TimeblocksProps = {
  [K in keyof ServiceValidated]: ServiceValidated[K];
} & {
  className?: string;
  onSelect?: (dt: DateTime) => void;
};

export const TimeBlocks = ({
  className,
  openingTime,
  closingTime,
  intervalInMinutes,
  onSelect,
}: TimeblocksProps) => {
  const blockRows = makeBlocks(openingTime, closingTime, intervalInMinutes);
  // console.log("blockRows: ", blockRows);
  console.log("first row: ", blockRows[0]);

  const defaultSelection = blockRows[0]![0];

  return (
    <Card
      className={cn(
        "flex-row flex-wrap max-w-full w-70 items-center justify-center md:w-86 px-4",
        className
      )}
    >
      <ToggleGroup
        defaultValue={defaultSelection?.toISO()!}
        // value={}
        type="single"
        onValueChange={(val) => {
          if (val && onSelect) onSelect(DateTime.fromISO(val));
        }}
        className="space-x-5"
      >
        {blockRows.map((bRow, i) => (
          <div className="flex flex-col space-y-5" key={i}>
            {bRow.map((b) => (
              <Timeblock dt={b} key={b.toISO()} />
            ))}
          </div>
        ))}
      </ToggleGroup>
    </Card>
  );
};

const Timeblock = ({ dt }: { dt: DateTime }) => {
  return (
    <ToggleGroupItem
      value={dt.toISO()!}
      className="bg-accent text-accent-foreground shadow-xs hover:bg-primary/90 rounded-md data-[state=on]:bg-primary border-2 border-primary data-[state=on]:border-primary data-[state=on]:text-primary-foreground"
    >
      <div className="w-24 h-10 flex items-center justify-center">
        {dt.toFormat("T")}
      </div>
    </ToggleGroupItem>
  );
};

const makeBlocks = (
  openingTime: DateTime,
  closingTime: DateTime,
  intervalInMinutes: number
) => {
  const blocks = [];
  let date = openingTime;
  const closed = closingTime;

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
