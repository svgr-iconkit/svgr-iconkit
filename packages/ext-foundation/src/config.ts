import { IconSVG, IconsMapType } from "@svgr-iconkit/core";
import { map as regularIconsMap } from "./icons";
export { IconNames } from "./icons";

export const familyName: string = "Foundation";


export type IconVariant = "regular";

export const variantNames: IconVariant[] = ["regular"];

export const defaultVariant: IconVariant = "regular";

export const map: Record<IconVariant, IconsMapType<string>> = {
  regular: {},
};

export const iconNames = Object.freeze(Object.keys(regularIconsMap));
iconNames.forEach( iconName => {
  map[defaultVariant][iconName] = (regularIconsMap as any)[iconName] as IconSVG;
})
