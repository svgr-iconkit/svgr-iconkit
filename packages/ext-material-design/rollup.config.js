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
    plugins,
  }),
  createRollupDataConfig({
    entryPath: "./src/gen/icons/regular",
    outputPath: "./icons/regular",
  }),
  createRollupDataConfig({
    entryPath: "./src/gen/icons/outlined",
    outputPath: "./icons/regular",
  }),
  createRollupDataConfig({
    entryPath: "./src/gen/icons/round",
    outputPath: "./icons/round",
  }),
  createRollupDataConfig({
    entryPath: "./src/gen/icons/sharp",
    outputPath: "./icons/sharp",
  }),
];
