
import React from "react";
import { createIconset } from "@svgr-iconkit/core";
import { IconNames, map } from "./map";
export * from "./map";
export const familyName: string = "MaterialCommunity";
export const Iconset = createIconset<IconNames>({familyName, map});

export default Iconset;
