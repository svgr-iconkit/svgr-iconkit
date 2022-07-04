

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