

module.exports = function rnAlias () {
  return {
    name: 'rn-alias', // this name will show up in warnings and errors
    generateBundle () {
      this.emitFile({
        type: 'asset',
        fileName: 'index.web.js',
        source: `module.exports = require('./native');`
      });
    }
  };
}