import { IconsMapType } from "@svgr-iconkit/core";
import { map as sharpIconsMap } from "./icons-sharp";
import { IconNames, map as regularIconsMap } from "./icons-regular";
import { map as outlineIconsMap } from "./icons-outline";
export { IconNames } from "./icons-regular";

export const familyName: string = "Ionicons";

export type IconVariant = "regular" | "sharp" | "outline";

export const variants: IconVariant[] = ["regular", "sharp", "outline"];

export const defaultVariant: IconVariant = "regular";

export const map: Record<IconVariant, IconsMapType<IconNames>> = {
  "regular": regularIconsMap,
  "sharp": sharpIconsMap,
  "outline": outlineIconsMap,
};

