import { IconsMapType } from "@svgr-iconkit/core";

import { map as regularIconsMap } from "./icons";

export { IconNames } from "./icons";

export type IconVariant = "regular";

export const variantNames: IconVariant[] = ["regular"];

export const defaultVariant: IconVariant = "regular";

export const familyName: string = "Octicons";

// icons map
export const map: Record<IconVariant, IconsMapType<string>> = {
  regular: regularIconsMap,
};

export const iconNames = Object.freeze(Object.keys(regularIconsMap));
