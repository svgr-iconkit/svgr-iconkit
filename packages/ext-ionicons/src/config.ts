import { IconsMapType } from "@svgr-iconkit/core";
import { map as sharpIconsMap } from "./data/sharp";
import { IconNames, map as regularIconsMap } from "./data/regular";
import { map as outlineIconsMap } from "./data/outline";
export { IconNames } from "./gen/icons/regular";

export const familyName: string = "Ionicons";

export type IconVariant = "regular" | "sharp" | "outline";

export const variantNames: IconVariant[] = ["regular", "sharp", "outline"];

export const defaultVariant: IconVariant = "regular";

export const map: Record<IconVariant, IconsMapType<IconNames>> = {
  regular: regularIconsMap,
  sharp: { ...regularIconsMap, ...sharpIconsMap },
  outline: { ...regularIconsMap, ...outlineIconsMap },
};
const filledIconsNames = Object.keys(regularIconsMap);
const outlinedIconsNames = Object.keys(outlineIconsMap);
const sharpIconsNames = Object.keys(sharpIconsMap);

let _iconNames: string[] = filledIconsNames;
_iconNames.concat(
  outlinedIconsNames.filter((name) => !_iconNames.includes(name))
);
_iconNames.concat(sharpIconsNames.filter((name) => !_iconNames.includes(name)));

export const iconNames = Object.freeze(_iconNames);

export const colorize = true;
