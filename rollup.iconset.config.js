
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import sourceMaps from "rollup-plugin-sourcemaps";
import camelCase from "lodash/camelcase";
import json from "@rollup/plugin-json";
import external from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

const globals = {
  "@svgr-iconkit/core": "SVGRIconKitCore",
  react: "React",
  "react-native-svg": "ReactNativeSVG",
};
const packageBasedSourcemapPathTransform = (packageName, relativeSourcePath) => {
  const output = String(relativeSourcePath).replace(/\.\.\/(src|node_modules)/g, `${packageName}/$1`);
  // console.log("package=%s, relative=%s, path=%s", packageName, relativeSourcePath, output);
  return output;
};

export const createRollupConfig = ({
  libraryName,
  entry,
  main,
  mainDir, 
  module,
  moduleDir, 
  plugins = [],
}) => {
  const sourcemapPathTransform = (relativeSourcePath, sourcemapPath) => packageBasedSourcemapPathTransform(libraryName, relativeSourcePath, sourcemapPath);
  const defaultExport = {
    input: entry,
    output: [
      {
        file: mainDir ? undefined:  main,
        dir: mainDir,
        name: camelCase(libraryName),
        format: "commonjs",
        sourcemap: true,
        sourcemapPathTransform,
        globals,
      },
      {
        file: moduleDir ? undefined: module,
        dir: moduleDir,
        format: "esm",
        sourcemap: true,
        sourcemapPathTransform,
        globals,
      },
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    watch: {
      include: "src/**",
    },
    plugins: [
      ...plugins,

      // Allow json resolution
      json(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve(),

      external(),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      // Compile TypeScript files
      typescript({ useTsconfigDeclarationDir: true }),

      // Resolve source maps to the original source
      sourceMaps(),

      terser(),
    ],
  };
  return defaultExport;
};
