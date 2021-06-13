import { createIconset } from "@svgr-iconkit/core";
import { familyName, IconNames, map, IconVariant, variants, defaultVariant } from "./config";
export * from "./config";
export const Iconset = createIconset<IconNames, IconVariant>({ familyName, map, variants, defaultVariant});
export default Iconset;
