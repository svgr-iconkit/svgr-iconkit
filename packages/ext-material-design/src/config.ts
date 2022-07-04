import { IconsMapType } from "@svgr-iconkit/core";
import { IconNames, map as regularIconsMap } from "./data/regular";
import { map as outlinedIconsMap } from "./data/outlined";
import { map as roundIconsMap } from "./data/round";
import { map as sharpIconsMap } from "./data/sharp";
export { IconNames } from "./data/regular";

export type IconVariant = "regular" | "outlined" | "round" | "sharp";

export const variantNames: IconVariant[] = [
  "regular",
  "outlined",
  "round",
  "sharp",
];

export const defaultVariant: IconVariant = "regular";

export const familyName: string = "MaterialDesignIcons";

// icons map
export const map: Record<IconVariant, IconsMapType<IconNames>> = {
  regular: regularIconsMap,
  outlined: { ...regularIconsMap, ...outlinedIconsMap },
  round: { ...regularIconsMap, ...roundIconsMap },
  sharp: { ...regularIconsMap, ...sharpIconsMap },
};

export const iconNames = Object.freeze(Object.keys(regularIconsMap));

export const colorize = true;
