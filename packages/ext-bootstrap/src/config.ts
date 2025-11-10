import { IconsMapType } from "@svgr-iconkit/core";
import { type IconNames as RegularIconNames, map as regularIconsMap } from "./data/regular";
import { type IconNames as FillIconNames, map as fillIconsMap } from "./data/fill";

export type IconNames = RegularIconNames & FillIconNames;

export type IconVariant = "regular" | "fill";

export const variantNames: IconVariant[] = ["regular"];

export const defaultVariant: IconVariant = "regular";

export const familyName: string = "BootstrapIcons";

// icons map
export const map: Record<IconVariant, IconsMapType<IconNames>> = {
  regular: regularIconsMap,
  fill: fillIconsMap,
};
const regularIconsNames = Object.keys(regularIconsMap);
const filledIconsNames = Object.keys(fillIconsMap);

let _iconNames = regularIconsNames;
_iconNames = _iconNames.concat(
  filledIconsNames.filter((name) => !_iconNames.includes(name))
);

export const iconNames = Object.freeze(_iconNames) as readonly IconNames[];

export const colorize = true;