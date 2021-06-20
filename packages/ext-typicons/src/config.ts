import { IconsMapType } from "@svgr-iconkit/core";
import { map as regularIconsMap } from "./icons-regular";
export { IconNames } from "./icons-regular";

export type IconVariant = "regular";

export const variants: IconVariant[] = ["regular"];

export const defaultVariant: IconVariant = "regular";

export const familyName: string = "Typicons";

// icons map
export const map: Record<IconVariant, IconsMapType<string>> = {
  regular: regularIconsMap,
};
