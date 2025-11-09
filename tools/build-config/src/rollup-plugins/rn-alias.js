

module.exports = function rnAlias ({ path = '../../', groupName = 'web' }) {
  return {
    name: 'rn-alias', // this name will show up in warnings and errors
    generateBundle () {
      this.emitFile({
        type: 'asset',
        fileName: 'index.d.ts',
        source: `
export { default } from '${path}types/${groupName}/index';
export * from '${path}types/${groupName}/index';
`
      });
    }
  };
}

module.exports = function outputAlias ({ path = '../../', filename = 'index.js' }) {
  return {
    name: 'output-alias', // this name will show up in warnings and errors
    generateBundle (outputOptions, bundle) {
      this.emitFile({
        type: 'asset',
        fileName: filename,
        source: `
export { default } from '${path}types/${groupName}/index';
export * from '${path}types/${groupName}/index';
`
      });
    }
  };
}