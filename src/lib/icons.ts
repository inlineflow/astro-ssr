import BarbershopLogo from "src/icons/barbershop.svg";
import NailPolishLogo from "src/icons/nail-polish.svg";

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
    Icon: BarbershopLogo,
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
