import { cn } from "@/lib/utils";
import { Card } from "@/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/ui/toggle-group";
import { DateTime } from "luxon";

type TimeblocksProps = {
  openingTime: string;
  closingTime: string;
  intervalInMinutes: number;
} & {
  className?: string;
  onSelect?: (dt: string) => void;
  selected?: string;
};

export const TimeBlocks = ({
  className,
  openingTime,
  closingTime,
  intervalInMinutes,
  onSelect,
  selected,
}: TimeblocksProps) => {
  const blockRows = makeBlocks(openingTime, closingTime, intervalInMinutes);

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
        value={selected ?? ""}
        type="single"
        onValueChange={(val) => {
          if (val && onSelect) onSelect(val);
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
