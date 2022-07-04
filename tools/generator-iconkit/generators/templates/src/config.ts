import type { IconsMapType } from "@svgr-iconkit/core";
export * from "./data/<%= variantName %>";
import { IconNames, map as regularIconMap } from "./data/<%= variantName %>";

export type IconVariant = "<%= variantName %>";

export const variantNames: IconVariant[] = ["<%= variantName %>"];

export const defaultVariant: IconVariant = "<%= variantName %>";

export const familyName: string = "<%= familyName %>";

export const map: Record<IconVariant, IconsMapType<IconNames>> = {
  ["<%= variantName %>"]: regularIconMap,
};

export const iconNames = Object.freeze(Object.keys(regularIconMap));

export const colorize = true;
