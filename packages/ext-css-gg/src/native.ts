import { createFamily, createVariantsMap } from "@svgr-iconkit/core/native";
import {
  familyName,
  IconNames,
  map,
  variantNames,
  IconVariant,
  defaultVariant,
  colorize,
} from "./config";
export * from "./config";
export const Iconset = createFamily<IconNames, IconVariant>({
  familyName,
  variantsMap: map,
  defaultVariant,
  colorize,
});
export const variants = createVariantsMap({
  familyName,
  variantNames,
  colorize,
  variantsMap: map,
});

export default Iconset;
