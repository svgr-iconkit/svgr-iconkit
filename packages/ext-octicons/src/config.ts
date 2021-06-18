import { IconSVG, IconsMapType } from "@svgr-iconkit/core";

import { map as iconsMap } from "./icons";

export { IconNames } from "./icons";

export type IconVariant = "regular";

export const variants: IconVariant[] = ["regular"];

export const defaultVariant: IconVariant = "regular";

export const familyName: string = "Octicons";

// icons map
export const map: Record<IconVariant, IconsMapType<string>> = {
  regular: iconsMap,
};

