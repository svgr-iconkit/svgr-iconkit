import svgData from "@svgr-iconkit/rollup-plugin-svg-data";
import { createRollupConfig } from "@svgr-iconkit/build-config";

const pkg = require("./package.json");

const plugins = [
  svgData({
  })
];

export default [
  createRollupConfig({
    libraryName: pkg.name,
    entry: ["./src/index.ts", "./src/index.native.ts", "./src/native.ts"],
    mainDir: pkg.commonjs.replace("index.js", ""),
    main: pkg.commonjs,
    moduleDir: pkg.module.replace("index.js", ""),
    module: pkg.module,
    plugins,
  }),
];
