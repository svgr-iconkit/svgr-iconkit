import { IconsMapType } from "@svgr-iconkit/core";
import { IconNames as filledIconNames, map as filledIconsMap } from "./icons-filled";
import { map as outlinedIconsMap } from "./icons-outlined";

export type IconVariant = "filled" | "outlined";

export const variants: IconVariant[] = ["filled", "outlined"];

export const defaultVariant: IconVariant = "filled";

export const familyName: string = "AntDesignIcon";

export const map: Record<IconVariant, IconsMapType<string>> = {
  filled: filledIconsMap,
  outlined: outlinedIconsMap,
};

// types
export type IconNames = filledIconNames;
