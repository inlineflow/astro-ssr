import { Icon, Scissors, ServerCog } from "lucide-react";
import { scissorsHairComb } from "@lucide/lab";
import BarbershopLogo from "src/icons/barbershop.svg?react";
import NailPolishLogo from "src/icons/nail-polish.svg?react";
import { cn } from "@/lib/utils";

export const commonContainerClasses = [
  "rounded-full",
  // "p-2",
  "flex",
  "items-center",
  "justify-center",
  "size-12",
];

export const serviceStyles = [
  {
    tag: "hairdressing",
    Icon: ({ className, ...props }: any) => (
      <Icon
        iconNode={scissorsHairComb}
        {...props}
        className={cn("stroke-black/65", className)}
      />
    ),
    // bgColor: "bg-yellow-100",
    bgColor: "bg-accent",
    bgHighlight: "data-[selected=true]:bg-yellow-200",
    classList: [],
  },
  {
    tag: "nail-polish",
    Icon: NailPolishLogo,
    // bgColor: "bg-pink-100",
    bgColor: "bg-accent",
    bgHighlight: "data-[selected=true]:bg-pink-200",
    classList: [],
  },
  {
    tag: "pedicure",
    Icon: NailPolishLogo,
    // bgColor: "bg-cyan-100",
    bgColor: "bg-accent",
    bgHighlight: "data-[selected=true]:bg-cyan-200",
    classList: [],
  },
];

export const ServiceIcons = ({
  tags,
  size,
}: {
  tags: string[];
  size?: number;
}) => {
  const availableServicesIcons = serviceStyles.filter((s) =>
    tags.includes(s.tag)
  );

  const __size = size ?? 32;

  return (
    <ul className="flex space-x-2">
      {availableServicesIcons.map((i) => (
        <li>
          <div
            className={cn(
              [...commonContainerClasses, ...i.classList, i.bgColor].join(" "),
              "size-8"
            )}
          >
            <i.Icon width={__size} height={__size} />
          </div>
        </li>
      ))}
    </ul>
  );
};
