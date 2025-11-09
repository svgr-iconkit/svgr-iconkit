import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve'
import { camelCase } from '@svgr-iconkit/common-utils'
import external from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

const pkg = require('./package.json')

const isDev = process.env.ENV === 'development'

const globals = {
  react: 'React',
  'react-native': 'ReactNative',
  'react-native-svg': 'ReactNativeSVG',
}
const manualChunks = (id) => {
  if (id.includes('node_modules')) return 'vendor';
  if (id.includes('src/utils')) return 'utils';
  if (id.includes('src/common')) return 'common';
  // Let Rollup handle entry
}
const defaultExport = [
  {
    input: {
      web: 'src/web/index.ts',
      native: 'src/native/index.ts',
    },
    output: [
      {
        dir: './lib',
        entryFileNames: '[name].cjs',
        chunkFileNames: 'chunks/[name]-[hash].cjs',
        name: camelCase(pkg.name),
        format: 'commonjs',
        sourcemap: true,
        globals,
        exports: 'named',
        manualChunks,
        plugins: [
          terser(),
        ],
      },
      {
        dir: './lib/dev',
        entryFileNames: '[name].cjs',
        chunkFileNames: 'chunks/[name]-[hash].cjs',
        name: camelCase(pkg.name),
        format: 'commonjs',
        sourcemap: false,
        globals,
        exports: 'named',
        manualChunks,
      },
      {
        dir: './lib',
        entryFileNames: '[name].mjs',
        chunkFileNames: 'chunks/[name]-[hash].mjs',
        name: camelCase(pkg.name),
        format: 'es',
        sourcemap: true,
        manualChunks,
        globals,
        plugins: [
          terser(),
        ],
      },
      {
        dir: './lib/dev',
        entryFileNames: '[name].mjs',
        chunkFileNames: 'chunks/[name]-[hash].mjs',
        name: camelCase(pkg.name),
        format: 'es',
        sourcemap: false,
        manualChunks,
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
      include: 'src/**',
    },
    plugins: [
      external({}),
      // Compile TypeScript files
      typescript({ useTsconfigDeclarationDir: false }),
      // Allow json resolution
      json(),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve(),
      
    ],
  },
]

export default defaultExport
