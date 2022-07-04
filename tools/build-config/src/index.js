const { createRollupLibraryConfig, createRollupDataConfig } = require('./rollup.iconset.config')
const rnAlias = require('./rollup-plugins/rn-alias')
module.exports = {
  rollupPlugins: { rnAlias },
  createRollupConfig: createRollupLibraryConfig,
  createRollupLibraryConfig,
  createRollupDataConfig,
}
