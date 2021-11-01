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
    entryPath: "./src/gen/icons/filled",
    outputPath: "./icons/filled",
  }),
  createRollupDataConfig({
    entryPath: "./src/gen/icons/outlined",
    outputPath: "./icons/outlined",
  }),
];
