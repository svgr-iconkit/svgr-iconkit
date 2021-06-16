import { IconSVG, IconsMapType } from "@svgr-iconkit/core";
import { map as iconsMap } from "./icons";
export { IconNames } from "./icons";

export const familyName: string = "Foundation";


export type IconVariant = "regular";

export const variants: IconVariant[] = ["regular"];

export const defaultVariant: IconVariant = "regular";

export const map: Record<IconVariant, IconsMapType<string>> = {
  regular: {},
};

Object.keys(iconsMap).forEach( iconName => {
  map[defaultVariant][iconName] = (iconsMap as any)[iconName] as IconSVG;
})