import { IconsMapType } from "@svgr-iconkit/core";
import { IconNames, map as regularIconsMap } from "./data/regular";
export { IconNames } from "./data/regular";

export const familyName: string = "Entypo";

export type IconVariant = "regular";

export const variantNames: IconVariant[] = ["regular"];

export const defaultVariant: IconVariant = "regular";

export const map: Record<IconVariant, IconsMapType<IconNames>> = {
  regular: regularIconsMap,
};

const regularIconsNames = Object.keys(regularIconsMap);

export const iconNames = Object.freeze(regularIconsNames);

export const colorize = true;
