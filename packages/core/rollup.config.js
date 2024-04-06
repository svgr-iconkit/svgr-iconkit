import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve'
import { rollupPlugins } from '@svgr-iconkit/build-config'
import { camelCase } from 'lodash'
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
const defaultExport = [
  {
    input: ['src/web/index.ts'],
    output: [
      {
        file: './lib/cjs/index.js',
        name: camelCase(pkg.name),
        format: 'commonjs',
        sourcemap: false,
        globals,
        exports: 'named',
        plugins: [rollupPlugins.rnAlias({ groupName: 'web' })],
      },
      {
        file: './lib/esm/index.js',
        format: 'es',
        sourcemap: false,
        globals,
        plugins: [rollupPlugins.rnAlias({ groupName: 'web' })],
      },
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    watch: {
      include: 'src/**',
    },
    plugins: [
      external({}),
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
      terser(),
    ],
  },
  {
    input: ['src/web/index.ts'],
    output: [
      {
        file: './lib/cjs/index.dev.js',
        name: camelCase(pkg.name),
        format: 'commonjs',
        sourcemap: false,
        globals,
        exports: 'named',
        plugins: [rollupPlugins.rnAlias({ groupName: 'web' })],
      },
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    watch: {
      include: 'src/**',
    },
    plugins: [
      external({}),
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
    ],
  },
  {
    input: ['src/native/index.ts'],
    output: [
      {
        dir: './native/lib/cjs',
        name: camelCase(pkg.name),
        format: 'commonjs',
        sourcemap: false,
        globals,
        exports: 'named',
        plugins: [rollupPlugins.rnAlias({ path: '../../../', groupName: 'native' })],
      },
      {
        dir: './native/lib/esm',
        format: 'es',
        sourcemap: false,
        globals,
        plugins: [rollupPlugins.rnAlias({ path: '../../../', groupName: 'native' })],
      },
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    watch: {
      include: 'src/**',
    },
    plugins: [
      external({}),
      // Compile TypeScript files
      typescript({ useTsconfigDeclarationDir: true }),
      // Allow json resolution
      json(),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      resolve(),

      terser(),
    ],
  },
]

export default defaultExport
