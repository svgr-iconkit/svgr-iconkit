import { createRollupConfig } from "@svgr-iconkit/build-utils";

const pkg = require("./package.json");

const plugins = [];

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
