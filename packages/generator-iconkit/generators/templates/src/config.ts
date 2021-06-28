import { IconsMapType } from "@svgr-iconkit/core";

export type IconVariant = "regular";

export const variantNames: IconVariant[] = ["regular"];

export const defaultVariant: IconVariant = "regular";

export const familyName: string = "<%= familyName %>";

export const map: Record<IconVariant, IconsMapType<string>> = {
  regular: {},
};

// icons map

// types
export type IconNames = "icon1" | "icon2";
