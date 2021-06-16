import { IconSVG } from "@svgr-iconkit/core";
import { map as iconsMap } from "./icons";
export { IconNames, map } from "./icons";

export const familyName: string = "Foundation";

export const icons: IconSVG[] = Object.keys(iconsMap).map(
  (name) => (iconsMap as any)[name] as IconSVG
);
