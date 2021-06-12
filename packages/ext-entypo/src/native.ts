import { createIconset } from "@svgr-iconkit/core/native";
import { familyName, IconNames, map } from "./config";
export * from "./config";
export const Iconset = createIconset<IconNames>({ familyName, map });
export default Iconset;
