// @ts-nocheck
import type { IconsMapType } from "@svgr-iconkit/core";

import { 
  type IconNames as RegularIconNames, 
  map as regularIconsMap 
} from "./data/<%= variantName %>";

export type IconNames = RegularIconNames;

export type IconVariant = "<%= variantName %>";

export const variantNames: IconVariant[] = ["<%= variantName %>"];

export const defaultVariant: IconVariant = "<%= variantName %>";

export const familyName: string = "<%= familyName %>";

// icons map
export const map: Record<IconVariant, IconsMapType<IconNames>> = {
  ["<%= variantName %>"]: regularIconsMap,
};
const regularIconsNames = Object.keys(regularIconsMap);


let _iconNames = regularIconsNames;

// other variants icons names
/**
_iconNames = _iconNames.concat(
  filledIconsNames.filter((name) => !_iconNames.includes(name))
);
 */
export const iconNames = Object.freeze(_iconNames) as readonly IconNames[];

export const colorize = false;
