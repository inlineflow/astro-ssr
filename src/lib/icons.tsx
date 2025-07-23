import { Icon, Scissors } from "lucide-react";
import { scissorsHairComb } from "@lucide/lab";
import BarbershopLogo from "src/icons/barbershop.svg?react";
import NailPolishLogo from "src/icons/nail-polish.svg?react";

export const commonContainerClasses = [
  "rounded-full",
  "p-2",
  "flex",
  "items-center",
  "justify-center",
  "size-12",
];

export const iconMap = [
  {
    tag: "hairdressing",
    Icon: (props: any) => <Icon iconNode={scissorsHairComb} {...props} />,
    classList: ["bg-yellow-100"],
  },
  {
    tag: "nail-polish",
    Icon: NailPolishLogo,
    classList: ["bg-pink-100"],
  },
  {
    tag: "pedicure",
    Icon: NailPolishLogo,
    classList: ["bg-cyan-200"],
  },
];
