import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import sourceMaps from "rollup-plugin-sourcemaps";
import json from "@rollup/plugin-json";
import external from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import { camelCase } from "lodash";
import { rollupPlugins } from "@svgr-iconkit/build-config";

const pkg = require("./package.json");

const isDev = process.env.ENV === "development"

const globals = {
  react: "React",
  "react-native": "ReactNative",
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
    input: ["src/web/index.ts"],
    output: [
      {
        dir: './lib/commonjs/web',
        name: camelCase(pkg.name),
        format: "commonjs",
        sourcemap: true,
        sourcemapPathTransform,
        globals,
        plugins: [rollupPlugins.rnAlias({groupName: 'web'})]
      },
      {
        dir: './lib/es/web',
        format: "es",
        sourcemap: true,
        sourcemapPathTransform,
        globals,
        plugins: [rollupPlugins.rnAlias({groupName: 'web'})]
      },
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    watch: {
      include: "src/**",
    },
    plugins: [

      sourceMaps(),

      external({
        
      }),
      // Compile TypeScript files
      typescript({ useTsconfigDeclarationDir: true, }),
      // Allow json resolution
      json(),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve(),

      isDev ? undefined : terser(),
    ],
  },
  {
    input: ["src/native/index.ts"],
    output: [
      {
        dir: './lib/commonjs/native',
        name: camelCase(pkg.name),
        format: "commonjs",
        sourcemap: true,
        sourcemapPathTransform,
        globals,
        plugins: [rollupPlugins.rnAlias({groupName: 'native'})]
      },
      {
        dir: './lib/es/native',
        format: "es",
        sourcemap: true,
        sourcemapPathTransform,
        globals,
        plugins: [rollupPlugins.rnAlias({groupName: 'native'})]
      },
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    watch: {
      include: "src/**",
    },
    plugins: [

      sourceMaps(),

      external({
        
      }),
      // Compile TypeScript files
      typescript({ useTsconfigDeclarationDir: true }),
      // Allow json resolution
      json(),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      resolve(),

      isDev ? undefined : terser(),
    ],
  },
];

export default defaultExport;
