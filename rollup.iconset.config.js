import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import sourceMaps from "rollup-plugin-sourcemaps";
import camelCase from "lodash/camelcase";
import json from "@rollup/plugin-json";
import external from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";

const globals = {
  "@svgr-iconkit/core": "SVGRIconKitCore",
  react: "React",
  "react-native-svg": "ReactNativeSVG",
};

export const createRollupConfig = ({ libraryName, entry, main, module }) => {
  const defaultExport = {
    input: entry,
    output: [
      {
        file: main,
        name: camelCase(libraryName),
        format: "umd",
        sourcemap: true,
        globals,
      },
      { file: module, format: "es", sourcemap: true, globals },
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    watch: {
      include: "src/**",
    },
    plugins: [
      // Allow json resolution
      json(),
      // Compile TypeScript files
      typescript({}),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve(),

      // Resolve source maps to the original source
      sourceMaps(),

      external(),
    ],
  };
  return defaultExport;
};
