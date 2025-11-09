const { createRollupLibraryConfig, createRollupDataConfig } = require('./rollup.iconset.config')
const rnAlias = require('./rollup-plugins/rn-alias')
const globAll = require('./glob-all')
module.exports = {
  rollupPlugins: { rnAlias },
  createRollupConfig: createRollupLibraryConfig,
  createRollupLibraryConfig,
  createRollupDataConfig,
  globAll,
}
