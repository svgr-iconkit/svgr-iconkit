import { createRollupConfig } from "../../rollup.iconset.config";

const pkg = require("./package.json");

export default [
  createRollupConfig({
    libraryName: pkg.name,
    entry: "./src/index.ts",
    main: pkg.commonjs,
    module: pkg.module,
  }),
  createRollupConfig({
    libraryName: pkg.name,
    entry: "./src/native.ts",
    main: pkg.commonjs.replace("index.js", "native.js"),
    module: pkg.module.replace("index.js", "native.js"),
  }),
];
