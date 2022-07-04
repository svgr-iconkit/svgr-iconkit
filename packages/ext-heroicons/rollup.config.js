import {
  createRollupLibraryConfig,
  createRollupDataConfig,
} from "@svgr-iconkit/build-config";

const pkg = require("./package.json");

const plugins = [];

export default [
  createRollupLibraryConfig({
    libraryName: pkg.name,
    entry: ["./src/index.ts", "./src/native.ts"],
    sourcemap: false,
    plugins,
  }),
  createRollupDataConfig({
    entryPath: "./src/data/solid",
    outputPath: "./icons/solid",
  }),
  createRollupDataConfig({
    entryPath: "./src/data/outline",
    outputPath: "./icons/outline",
  }),
];
