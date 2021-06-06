import { createIconset } from "@svgr-iconkit/core/native";
import { familyName, IconNames, map } from "./icons";
export * from "./icons";
export const Iconset = createIconset<IconNames>({ familyName, map });
export default Iconset;
