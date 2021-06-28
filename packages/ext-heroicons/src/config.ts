import { IconsMapType } from "@svgr-iconkit/core";
import { map as solidIconsMap } from "./icons-solid";
import { map as outlineIconsMap } from "./icons-outline";
export { IconNames } from "./icons-solid";

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
_iconNames = _iconNames.concat(outlinedIconsNames.filter( name => !_iconNames.includes(name)));

export const iconNames = Object.freeze(_iconNames);
