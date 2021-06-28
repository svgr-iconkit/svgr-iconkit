import { IconSVG, IconsMapType } from "@svgr-iconkit/core";
import { IconNames, map as regularIconsMap } from "./icons";
export { IconNames } from "./icons";

export const familyName: string = "Foundation";

export type IconVariant = "regular";

export const variantNames: IconVariant[] = ["regular"];

export const defaultVariant: IconVariant = "regular";

const _tmpMap: any = {
  regular: {},
};
export const iconNames = Object.freeze(Object.keys(regularIconsMap));
iconNames.forEach( iconName => {
  _tmpMap[defaultVariant][iconName] = (regularIconsMap as any)[iconName] as IconSVG;
})

export const map: Record<IconVariant, IconsMapType<IconNames>> = _tmpMap;
