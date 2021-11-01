import { IconsMapType } from "@svgr-iconkit/core";
import { map as wideIconsMap } from "./gen/icons/regular";
import { IconNames, map as squareIconsMap } from "./gen/icons/square";
export { IconNames } from "./gen/icons/square";

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

