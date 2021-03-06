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
    entryPath: "./src/data/filled",
    outputPath: "./icons/filled",
  }),
  createRollupDataConfig({
    entryPath: "./src/data/outlined",
    outputPath: "./icons/outlined",
  }),
];
