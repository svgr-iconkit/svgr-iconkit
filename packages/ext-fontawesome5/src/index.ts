import { createIconset } from "@svgr-iconkit/core";
import {
  familyName,
  IconNames,
  IconVariant,
  map,
  defaultVariant,
  variants,
} from "./config";
export * from "./config";
export const Iconset = createIconset<IconNames, IconVariant>({
  familyName,
  map,
  defaultVariant,
  variants,
});
export default Iconset;
