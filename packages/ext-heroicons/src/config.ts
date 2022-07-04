import { IconsMapType } from "@svgr-iconkit/core";
import { map as solidIconsMap } from "./data/solid";
import { map as outlineIconsMap } from "./data/outline";
export { IconNames } from "./data/solid";

export type IconVariant = "solid" | "outline";

export const variantNames: IconVariant[] = ["solid", "outline"];

export const defaultVariant: IconVariant = "solid";

export const familyName: string = "Heroicons";

// icons map
export const map: Record<IconVariant, IconsMapType<string>> = {
  solid: solidIconsMap,
  outline: outlineIconsMap,
};

const filledIconsNames = Object.keys(solidIconsMap);
const outlinedIconsNames = Object.keys(outlineIconsMap);

let _iconNames = filledIconsNames;
_iconNames = _iconNames.concat(
  outlinedIconsNames.filter((name) => !_iconNames.includes(name))
);

export const iconNames = Object.freeze(_iconNames);

export const colorize = true;
