import { createRollupConfig } from "../../rollup.iconset.config";

const pkg = require("./package.json");

export default [
  createRollupConfig({
    libraryName: pkg.name,
    entry: "./src/index.ts",
    main: pkg.main,
    module: pkg.module,
  }),
  createRollupConfig({
    libraryName: pkg.name,
    entry: "./src/native/index.ts",
    main: pkg.main.replace("index.js", "native.js"),
    module: pkg.module.replace("index.js", "native.js"),
  }),
];
