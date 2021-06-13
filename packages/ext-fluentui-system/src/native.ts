import { createIconset } from "@svgr-iconkit/core/native";
import { familyName, IconNames, IconVariant, variants, defaultVariant, map } from "./config";
export * from "./config";
export const Iconset = createIconset<IconNames, IconVariant>({ familyName, map, variants, defaultVariant });
export default Iconset;
