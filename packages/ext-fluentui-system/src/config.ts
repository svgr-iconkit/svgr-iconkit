import { IconsMapType } from "@svgr-iconkit/core";
import {
  IconNames as regularIconNames,
  map as regularIconsMap,
} from "./data/regular";
import {
  IconNames as filledIconNames,
  map as filledIconsMap,
} from "./data/filled";
export { IconNames } from "./data/filled";

export const familyName: string = "FluentUISystem";

export type IconVariant = "regular" | "filled";

export const variantNames: IconVariant[] = ["regular", "filled"];

export const defaultVariant: IconVariant = "filled";

export const map: Record<IconVariant, IconsMapType<filledIconNames>> = {
  regular: { ...filledIconsMap, ...regularIconsMap },
  filled: filledIconsMap,
};

const regularIconsNames = Object.keys(regularIconsMap);
const filledIconsNames = Object.keys(filledIconsMap);

let _iconNames = regularIconsNames;
_iconNames = _iconNames.concat(
  filledIconsNames.filter((name) => !_iconNames.includes(name))
);

export const iconNames = Object.freeze(_iconNames);

export const colorize = true;
