import type { IconsMapType } from "@svgr-iconkit/core";
export * from "./data/regular";
import { IconNames, map as regularIconMap } from "./data/regular";

export type IconVariant = "regular";

export const variantNames: IconVariant[] = ["regular"];

export const defaultVariant: IconVariant = "regular";

export const familyName: string = "Grommet Icons";

export const iconNames = Object.freeze(Object.keys(regularIconMap));

export const map: Record<IconVariant, IconsMapType<IconNames>> = {
  ["regular"]: regularIconMap,
};

export const colorize = true;
