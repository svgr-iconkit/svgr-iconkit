import { IconSVG, IconsMapType } from "@svgr-iconkit/core";
import { map as iconsMap } from "./icons";
export { IconNames } from "./icons";

export const familyName: string = "Entypo";


export type IconVariant = "regular";

export const variants: IconVariant[] = ["regular"];

export const defaultVariant: IconVariant = "regular";

export const map: Record<IconVariant, IconsMapType<string>> = {
  regular: {},
};

Object.keys(iconsMap).forEach(
  (name) => {
    map[defaultVariant][name] = (iconsMap as any)[name] as IconSVG;
  }
);
