import { createFamily, createVariantsMap } from "@svgr-iconkit/core";
import { familyName, IconNames, map, IconVariant, variantNames, defaultVariant, colorize } from "./config";
export * from "./config";
export const Iconset = createFamily<IconNames, IconVariant>({
  familyName,
  variantsMap: map,
  defaultVariant,
  colorize,
});
export const variants = createVariantsMap<IconNames, IconVariant>({
  familyName,
  variantNames,
  colorize,
  variantsMap: map,
});

export default Iconset;
