import { IconsMapType } from "@svgr-iconkit/core";
import { IconNames, map as regularIconsMap } from "./gen/icons/regular";
import { map as outlinedIconsMap } from "./gen/icons/outlined";
import { map as roundIconsMap } from "./gen/icons/round";
import { map as sharpIconsMap } from "./gen/icons/sharp";
export { IconNames } from "./gen/icons/regular";

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
