import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import sourceMaps from "rollup-plugin-sourcemaps";
import camelCase from "lodash/camelcase";
import json from "@rollup/plugin-json";
import external from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

const pkg = require("./package.json");

const globals = {
  react: "React",
  "react-native-svg": "ReactNativeSVG",
};
const packageBasedSourcemapPathTransform = (
  packageName,
  relativeSourcePath
) => {
  const output = String(relativeSourcePath).replace(
    /\.\.\/(src|node_modules)/g,
    `${packageName}/$1`
  );
  // console.log("package=%s, relative=%s, path=%s", packageName, relativeSourcePath, output);
  return output;
};

const sourcemapPathTransform = (relativeSourcePath, sourcemapPath) =>
  packageBasedSourcemapPathTransform(
    pkg.name,
    relativeSourcePath,
    sourcemapPath
  );

const defaultExport = [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.commonjs,
        name: camelCase(pkg.name),
        format: "umd",
        sourcemap: true,
        sourcemapPathTransform,
        globals,
      },
      {
        file: pkg.module,
        format: "es",
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
      // Compile TypeScript files
      typescript({ useTsconfigDeclarationDir: true }),
      // Allow json resolution
      json(),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve(),

      // Resolve source maps to the original source
      sourceMaps(),

      external(),

      terser(),
    ],
  },
  {
    input: "src/native.ts",
    output: [
      {
        file: pkg.commonjs.replace("index.js", "native.js"),
        name: camelCase(pkg.name),
        format: "umd",
        sourcemap: true,
        globals,
      },
      {
        file: pkg.module.replace("index.js", "native.js"),
        format: "es",
        sourcemap: true,
        globals,
      },
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    watch: {
      include: "src/**",
    },
    plugins: [
      // Compile TypeScript files
      typescript({ useTsconfigDeclarationDir: true }),
      // Allow json resolution
      json(),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve(),

      // Resolve source maps to the original source
      sourceMaps(),

      external(),

      terser(),
    ],
  },
];

export default defaultExport;
