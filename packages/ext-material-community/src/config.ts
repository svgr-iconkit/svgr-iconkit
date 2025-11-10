import { IconsMapType } from "@svgr-iconkit/core";
import { map as outlineIconsMap } from "./data/outline";
import { IconNames, map as regularIconsMap } from "./data/regular";
export type { IconNames } from "./data/regular";

export const familyName: string = "MaterialCommunityIcons";

export type IconVariant = "regular" | "outline";

export const variantNames: IconVariant[] = ["regular", "outline"];

export const defaultVariant: IconVariant = "regular";

export const map: Record<IconVariant, IconsMapType<IconNames>> = {
  regular: regularIconsMap,
  outline: {...regularIconsMap, ...outlineIconsMap},
};

const regularIconsNames = Object.keys(regularIconsMap) as readonly IconNames[];

let _iconNames = regularIconsNames;

export const iconNames = Object.freeze(_iconNames) as readonly IconNames[];

export const colorize = true;

