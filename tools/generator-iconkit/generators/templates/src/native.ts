import { createIconset } from "@svgr-iconkit/core/native";
import { familyName, IconNames, map, IconVariant, variantNames as variants, defaultVariant } from "./config";
export * from "./config";
export const Iconset = createIconset<IconNames, IconVariant>({ familyName, map, variants, defaultVariant});
export default Iconset;
