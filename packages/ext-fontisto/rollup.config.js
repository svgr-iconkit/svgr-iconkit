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
];
