import { IconsMapType } from "@svgr-iconkit/core";
import { map as solidIconsMap } from "./icons-solid";
import { map as outlineIconsMap } from "./icons-outline";
export { IconNames } from "./icons-solid";

export type IconVariant = "solid" | "outline";

export const variants: IconVariant[] = ["solid", "outline"];

export const defaultVariant: IconVariant = "solid";

export const familyName: string = "Heroicons";

// icons map
export const map: Record<IconVariant, IconsMapType<string>> = {
  solid: solidIconsMap,
  outline: outlineIconsMap,
};

