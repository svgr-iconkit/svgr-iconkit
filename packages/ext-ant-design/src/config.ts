import { IconsMapType } from "@svgr-iconkit/core";
import { IconNames as filledIconNames, map as filledIconsMap } from "./icons-filled";
import { map as outlinedIconsMap } from "./icons-outlined";
import { map as twotoneIconsMap } from "./icons-twotone";

export type IconVariant = "filled" | "outlined" | "twotone";

export const variants: IconVariant[] = ["filled", "outlined", "twotone"];

export const defaultVariant: IconVariant = "filled";

export const familyName: string = "AntDesignIcon";

export const map: Record<IconVariant, IconsMapType<string>> = {
  filled: filledIconsMap,
  outlined: outlinedIconsMap,
  twotone: twotoneIconsMap,
};

// types
export type IconNames = filledIconNames;
