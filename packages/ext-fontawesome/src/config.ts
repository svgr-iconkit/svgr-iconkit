import { IconsMapType } from "@svgr-iconkit/core";
import { map as regularIconsMap, IconNames as regularIconNames } from "./data/regular";
import { map as solidIconsMap, IconNames as solidIconNames } from "./data/solid";

export type IconNames = regularIconNames & solidIconNames;

export const familyName: string = "FontAwesomeFree";

export type IconVariant = "regular" | "solid";

export const variantNames: IconVariant[] = ["regular", "solid"];

export const defaultVariant: IconVariant = "solid";

export const map: Record<IconVariant, IconsMapType<string>> = {
  regular: { ...solidIconsMap, ...regularIconsMap },
  solid: solidIconsMap,
};

const regularIconsNames = Object.keys(regularIconsMap);
const solidIconsNames = Object.keys(solidIconsMap);

let _iconNames = regularIconsNames;
_iconNames = _iconNames.concat(
  solidIconsNames.filter((name) => !_iconNames.includes(name))
);

export const iconNames = Object.freeze(_iconNames);

export const colorize = true;
