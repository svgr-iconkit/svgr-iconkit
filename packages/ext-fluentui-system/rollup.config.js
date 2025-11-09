import {
  createRollupLibraryConfig,
  createRollupDataConfig,
  globAll,
} from "@svgr-iconkit/build-config";

const pkg = require("./package.json");

const plugins = [];

export default [
  createRollupLibraryConfig({
    libraryName: pkg.name,
    entry: globAll(),
    sourcemap: false,
    plugins,
  }),
  createRollupDataConfig({
    entryPath: "./src/data/regular",
    outputPath: "./icons/regular",
  }),
  createRollupDataConfig({
    entryPath: "./src/data/filled",
    outputPath: "./icons/filled",
  }),
];
