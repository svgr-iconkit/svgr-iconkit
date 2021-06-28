import { IconsMapType } from "@svgr-iconkit/core";
import { map as regularIconsMap } from "./gen/icons/regular";
import { map as solidIconsMap } from "./gen/icons/solid";
export { IconNames } from "./gen/icons/solid";

export const familyName: string = "FontAwesome5";

export type IconVariant = "regular" | "solid";

export const variantNames: IconVariant[] = ["regular", "solid"];

export const defaultVariant: IconVariant = "solid";

export const map: Record<IconVariant, IconsMapType<string>> = {
  regular: regularIconsMap,
  solid: solidIconsMap,
};

const regularIconsNames = Object.keys(regularIconsMap);
const solidIconsNames = Object.keys(solidIconsMap);

let _iconNames = regularIconsNames;
_iconNames = _iconNames.concat(solidIconsNames.filter( name => !_iconNames.includes(name)));

export const iconNames = Object.freeze(_iconNames);
