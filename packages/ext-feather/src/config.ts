import { IconSVG, IconsMapType } from "@svgr-iconkit/core";
import { map as iconsMap } from "./icons";
export { IconNames } from "./icons";

export const familyName: string = "Feather";


export type VariantNames = "regular";

export const variants: VariantNames[] = ["regular"];

export const defaultVariant: VariantNames = "regular";

export const map: Record<VariantNames, IconsMapType<string>> = {
  regular: {},
};

Object.keys(iconsMap).forEach(
  (name) => {
    map[defaultVariant][name] = (iconsMap as any)[name] as IconSVG;
  }
);
