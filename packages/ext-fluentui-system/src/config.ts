import { IconsMapType } from "@svgr-iconkit/core";
import { map as regularIconsMap } from "./icons-regular";
import { map as filledIconsMap } from "./icons-filled";
export { IconNames } from "./icons-filled";

export const familyName: string = "FluentUISystem";

export type IconVariant = "regular" | "filled";

export const variants: IconVariant[] = ["regular", "filled"];

export const defaultVariant: IconVariant = "regular";

export const map: Record<IconVariant, IconsMapType<string>> = {
  regular: regularIconsMap,
  filled: filledIconsMap,
};
