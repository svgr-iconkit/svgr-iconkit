import { IconsMapType } from "@svgr-iconkit/core";
import { map as regularIconsMap } from "./gen/icons/regular";
export { IconNames } from "./gen/icons/regular";

export const familyName: string = "Entypo";


export type IconVariant = "regular";

export const variantNames: IconVariant[] = ["regular"];

export const defaultVariant: IconVariant = "regular";

export const map: Record<IconVariant, IconsMapType<string>> = {
  regular: regularIconsMap,
};


const regularIconsNames = Object.keys(regularIconsMap);

export const iconNames = Object.freeze(regularIconsNames);
