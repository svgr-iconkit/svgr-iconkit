import { IconsetSVG } from "@svgr-iconkit/core";
import { map as iconsMap } from "./icons";
export { IconNames, map } from "./icons";

export const familyName: string = "Entypo";

export const icons: IconsetSVG[] = Object.keys(iconsMap).map(
  (name) => (iconsMap as any)[name] as IconsetSVG
);
