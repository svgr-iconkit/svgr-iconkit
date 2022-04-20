import { IconsMapType } from "@svgr-iconkit/core";
import { map as wideIconsMap } from "./data/regular";
import { IconNames, map as squareIconsMap } from "./data/square";
export { IconNames } from "./data/square";

export type IconVariant = "regular" | "square"

export const variantNames: IconVariant[] = ["regular", "square"];

export const defaultVariant: IconVariant = "regular";

export const familyName: string = "FlagIcons";

// icons map
export const map: Record<IconVariant, IconsMapType<IconNames>> = {
  "regular": wideIconsMap,
  "square": squareIconsMap,
};

export const iconNames = Object.freeze(Object.keys(squareIconsMap));

export const colorize = false;

