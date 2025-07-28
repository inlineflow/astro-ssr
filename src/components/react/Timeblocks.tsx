import { cn } from "@/lib/utils";
import { Card } from "@/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/ui/toggle-group";
import { DateTime } from "luxon";
import { useSelectedService } from "./AppointmentServiceControlsContext";
import i18n from "src/lib/i18n";

type TimeblocksProps = {
  openingTime: string;
  closingTime: string;
  // durationInMinutes: number;
} & {
  className?: string;
  onSelect?: (dt: string) => void;
  selected?: string;
  id?: string;
  ariaDescribedBy?: string;
};

export const TimeBlocks = ({
  className,
  openingTime,
  closingTime,
  // durationInMinutes,
  onSelect,
  selected,
  id,
  ariaDescribedBy,
}: TimeblocksProps) => {
  const { selectedService } = useSelectedService();

  if (!selectedService.durationInMinutes) {
    return (
      // <Card className="items-center justify-center aspect-square">
      <Card className="items-center justify-center md:min-w-86 mb-5 aspect-square">
        <p>{i18n.t("form.pick_a_service")}</p>
      </Card>
    );
  }

  const blockRows = makeBlocks(
    openingTime,
    closingTime,
    selectedService.durationInMinutes
  );

  const defaultSelection = blockRows[0]![0];

  return (
    <div>
      <input
        type="date"
        name={id}
        id={id}
        value={selected}
        defaultValue={defaultSelection?.toISO()!}
        aria-describedby={ariaDescribedBy}
        hidden
        readOnly
      />
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
    </div>
  );
};

const Timeblock = ({ dt }: { dt: DateTime }) => {
  return (
    <ToggleGroupItem
      value={dt.toISO()!}
      className="bg-accent text-accent-foreground shadow-xs hover:bg-primary/90 rounded-md data-[state=on]:bg-primary border-2 border-primary/40 data-[state=on]:border-primary data-[state=on]:text-primary-foreground"
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
