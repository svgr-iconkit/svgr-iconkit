import { IconsMapType } from "@svgr-iconkit/core";
export * from "./gen/<%= variantName>";
import { IconNames } from "./gen/<%= variantName>";

export type IconVariant = "<%= variantName>";

export const variantNames: IconVariant[] = ["<%= variantName>"];

export const defaultVariant: IconVariant = "<%= variantName>";

export const familyName: string = "<%= familyName %>";

export const map: Record<IconVariant, IconsMapType<string>> = {
  ["<%= variantName>"]: {},
};

export const colorize = true;
