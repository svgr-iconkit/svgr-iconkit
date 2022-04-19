import type { IconsMapType } from "@svgr-iconkit/core";
export * from "./gen/icons/regular";
import { IconNames, map as regularIconMap } from "./gen/icons/regular";

export type IconVariant = "regular";

export const variantNames: IconVariant[] = ["regular"];

export const defaultVariant: IconVariant = "regular";

export const familyName: string = "Weather Icons";

export const map: Record<IconVariant, IconsMapType<IconNames>> = {
  ["regular"]: regularIconMap,
};

export const colorize = true;
