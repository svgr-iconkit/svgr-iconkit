const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const sourceMaps = require("rollup-plugin-sourcemaps");
const json = require("@rollup/plugin-json");
const external = require("rollup-plugin-peer-deps-external");
const typescript = require("rollup-plugin-typescript2");
const { terser } = require("rollup-plugin-terser");
const fs = require("fs");
const path = require("path");

const defaultGlobals = {
  "@svgr-iconkit/core": "SVGRIconKitCore",
  react: "React",
  "react-native-svg": "RNSVG",
};
// Function to estimate module size (in bytes; approximate via file size or graph analysis)
function estimateModuleSize(id, getModuleInfo) {
  const info = getModuleInfo(id);
  // Simple heuristic: use imported length or fetch file size (extend as needed)
  return info ? Buffer.byteLength(info.code || '') : 0; // Or use fs.statSync(id).size for file-based
}

// manualChunks function: Assign to chunks <= 300KB (307200 bytes)
function createManualChunks(id, { getModuleInfo, getModuleIds }) {
  const ids = getModuleIds(); // All module IDs
  const chunkMap = new Map(); // Track current chunks and their sizes
  let currentChunk = 'chunk-0';
  let currentSize = 0;
  let chunkIndex = 0;

  const moduleInfo = Array.from(ids)
    .map(mid => ({ id: mid, size: estimateModuleSize(mid, getModuleInfo) }))

  // Sort modules by size (descending) for greedy packing
  const sortedIds = moduleInfo
    .sort((a, b) => b.size - a.size);

  for (const { id, size } of sortedIds) {
    if (currentSize + size > 307200 && currentSize > 0) { // 300KB limit; start new chunk if exceeded
      chunkIndex++;
      currentChunk = `chunk-${chunkIndex}`;
      currentSize = 0;
    }
    chunkMap.set(id, currentChunk);
    currentSize += size;
  }

  return chunkMap.get(id) || 'main'; // Fallback to main chunk
}

function filterExpectedEntryFileName(name) {
  if (name.startsWith(".")) {
    return false;
  }
  if (name.endsWith(".ts") && !name.endsWith(".d.ts")) {
    return true;
  }
  if (name.endsWith(".js")) {
    return true;
  }
  return false;
}

function packageBasedSourcemapPathTransform(packageName, relativeSourcePath) {
  const output = String(relativeSourcePath).replace(
    /\.\.\/(src|gen|node_modules)/g,
    `${packageName}/$1`
  );
  return output;
}

function createRollupLibraryConfig({
  libraryName,
  entry,
  entryRootPath: rootPath,
  globals = defaultGlobals,
  typescriptConfig = {
    useTsconfigDeclarationDir: false,
  },
  sourcemap = true,
  minify = true,
  plugins = [],
  outputs = {
    commonjs: {
      dir: "lib/",
      exports: "named",
      entryFileNames: '[name].cjs',
      chunkFileNames: '[name]-[hash].cjs',
      plugins: [],
    },
    esm: {
      dir: "lib/",
      exports: "named",
      entryFileNames: '[name].mjs',
      chunkFileNames: '[name]-[hash].mjs',
      plugins: [],
    },
  },
}) {
  const sourcemapPathTransform = (relativeSourcePath, sourcemapPath) =>
    packageBasedSourcemapPathTransform(
      libraryName,
      relativeSourcePath,
      sourcemapPath
    );

  const defaultPlugins = [
    // Allow json resolution
    json(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    nodeResolve(),

    external(),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Compile TypeScript files
    typescript(typescriptConfig),

    // Resolve source maps to the original source
    sourceMaps(),

    minify ? terser() : undefined,
  ];

  let _entry = entry;

  // Replace a list of files instead of single entry
  if (rootPath) {
    const rootDirectory = path.join(process.cwd(), rootPath);
    _entry = fs
      .readdirSync(rootDirectory)
      .filter(filterExpectedEntryFileName)
      .map((name) => path.join(rootPath, name));
  }

  const rollupConfig = {
    input: _entry,
    output: [
      outputs.commonjs && {
        preserveModules: true,
        ...outputs.commonjs,
        name: libraryName,
        format: "commonjs",
        sourcemap,
        sourcemapPathTransform,
        globals,
      },
      outputs.esm && {
        preserveModules: true,
        ...outputs.esm,
        format: "esm",
        sourcemap,
        sourcemapPathTransform,
        globals,
      },
    ],
    
    // Ensure tree-shaking
    treeshake: {
      moduleSideEffects: false,
    },
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    watch: {
      include: "src/**",
    },
    plugins:
      plugins &&
      (typeof plugins === "function"
        ? plugins(defaultPlugins)
        : [...defaultPlugins, ...plugins]),
  };
  return rollupConfig;
}


/**
 * Export 
 * @param {*} param0 
 * @returns 
 */
function createRollupDataConfig({
  entryPath,
  outputPath,
  globals = defaultGlobals,
  typescriptConfig = {
    useTsconfigDeclarationDir: false,
    tsconfigOverride: {
      include: [entryPath],
    }
  },
  sourcemap = false,
  minify = true,
  plugins = [],
  outputs = {
    commonjs: {
      exports: "named",
      preserveModules: true,
      entryFileNames: '[name].cjs',
    },
    esm: {
      exports: "named",
      preserveModules: true,
      entryFileNames: '[name].mjs',
    },
  },
}) {
  const sourcemapPathTransform = (relativeSourcePath, sourcemapPath) =>
    packageBasedSourcemapPathTransform(
      libraryName,
      relativeSourcePath,
      sourcemapPath
    );

  const defaultPlugins = [
    // Allow json resolution
    json(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    nodeResolve(),

    external(),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Compile TypeScript files
    typescript(typescriptConfig),

    // Resolve source maps to the original source
    sourceMaps(),

    minify ? terser() : undefined,
  ];

  const rootDirectory = path.join(process.cwd(), entryPath);
  const entries = fs
    .readdirSync(rootDirectory)
    .filter(filterExpectedEntryFileName)
    .map((name) => path.join(entryPath, name));


  const rollupConfig = {
    input: entries,
    output: [{
        format: "commonjs",
        sourcemap,
        sourcemapPathTransform,
        globals,
        ...outputs.commonjs,
        dir: outputPath,
      }, {
        format: "esm",
        sourcemap,
        sourcemapPathTransform,
        globals,
        ...outputs.esm,
        dir: outputPath,
      }
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    plugins:
      plugins &&
      (typeof plugins === "function"
        ? plugins(defaultPlugins)
        : [...defaultPlugins, ...plugins]),
  };
  return rollupConfig;
}

module.exports = {
  createRollupLibraryConfig,
  createRollupDataConfig,
};
