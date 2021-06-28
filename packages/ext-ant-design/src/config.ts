import { IconsMapType } from "@svgr-iconkit/core";
import { IconNames as filledIconNames, map as filledIconsMap } from "./gen/icons/filled";
import {
  IconNames as outlinedIconNames,
  map as outlinedIconsMap,
} from "./gen/icons/outlined";

export type IconVariant = "filled" | "outlined";

export const variantNames: IconVariant[] = ["filled", "outlined"];

export const defaultVariant: IconVariant = "outlined";

export const familyName: string = "AntDesignIcon";

export const map: Record<IconVariant, IconsMapType<string>> = {
  filled: filledIconsMap,
  outlined: outlinedIconsMap,
};

// types
export type IconNames = filledIconNames | outlinedIconNames;

const filledIconsNames = Object.keys(filledIconsMap);
const outlinedIconsNames = Object.keys(outlinedIconsMap);

let _iconNames = filledIconsNames;
_iconNames = _iconNames.concat(outlinedIconsNames.filter( name => !_iconNames.includes(name)));

export const iconNames = Object.freeze(_iconNames);
