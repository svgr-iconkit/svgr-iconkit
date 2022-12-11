import { IconsMapType } from "@svgr-iconkit/core";
import { IconNames, map as regularIconsMap } from "./data/regular";
export { IconNames } from "./data/regular";

export type IconVariant = "regular";

export const variantNames: IconVariant[] = ["regular"];

export const defaultVariant: IconVariant = "regular";

export const familyName: string = "Evil Icons";

// icons map


export const map: Record<IconVariant, IconsMapType<IconNames>> = {
  regular: regularIconsMap,
};

export const iconNames = Object.freeze(Object.keys(regularIconsMap));

export const colorize = true;
