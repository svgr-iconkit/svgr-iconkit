import { IconsetSVG } from "@svgr-iconkit/core";
import { map as iconsMap } from "./icons";
export { IconNames, map } from "./icons";

export const familyName: string = "Ionicons";

export const icons: IconsetSVG[] = Object.keys(iconsMap).map(
  (name) => (iconsMap as any)[name] as IconsetSVG
);
