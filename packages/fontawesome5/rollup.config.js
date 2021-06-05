import { createRollupConfig } from "../../rollup.iconset.config";

const pkg = require("./package.json");

export default [
  createRollupConfig({
    libraryName: pkg.name,
    entry: "./src/index.ts",
    main: pkg.main,
    module: pkg.module,
  }),
];
