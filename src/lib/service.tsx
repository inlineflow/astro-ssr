import { Icon, Scissors } from "lucide-react";
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
    bgColor: "bg-yellow-100",
    bgHighlight: "data-[selected=true]:bg-yellow-200",
    classList: [],
  },
  {
    tag: "nail-polish",
    Icon: NailPolishLogo,
    bgColor: "bg-pink-100",
    bgHighlight: "data-[selected=true]:bg-pink-200",
    classList: [],
  },
  {
    tag: "pedicure",
    Icon: NailPolishLogo,
    bgColor: "bg-cyan-100",
    bgHighlight: "data-[selected=true]:bg-cyan-200",
    classList: [],
  },
];
