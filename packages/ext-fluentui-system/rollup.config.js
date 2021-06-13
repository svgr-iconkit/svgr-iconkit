import svgData from "@svgr-iconkit/rollup-plugin-svg-data";
import { createRollupConfig } from "../../rollup.iconset.config";

const pkg = require("./package.json");

const plugins = [
  svgData({
  })
];


export default [
  createRollupConfig({
    libraryName: pkg.name,
    entry: "./src/index.ts",
    main: pkg.main,
    module: pkg.module,
    plugins,
  }),
  createRollupConfig({
    libraryName: pkg.name,
    entry: "./src/native.ts",
    main: pkg.main.replace("index.js", "native.js"),
    module: pkg.module.replace("index.js", "native.js"),
    plugins,
  }),
];