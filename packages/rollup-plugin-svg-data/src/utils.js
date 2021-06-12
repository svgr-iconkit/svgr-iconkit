const { parse } = require("svg-parser");

const disallowedAttributeNames = ["xmlns", "class", "className", "style"];

function isAllowedAttributeName(name) {
  if (disallowedAttributeNames.includes(name)) return false;
  if (name.indexOf(":") > -1) {
    return false;
  }
  return true;
}

function getChildrenData(node) {
  const attrs = {};
  Object.keys(node.properties)
    .filter(isAllowedAttributeName)
    .forEach((propertyName) => {
      attrs[propertyName] = node.properties[propertyName];
    });

  const hasChildren =
    node.children && Array.isArray(node.children) && node.children.length > 0;
  return {
    tagName: node.tagName,
    attrs,
    children: !hasChildren ? [] : node.children.map(getChildrenData),
  };
}


function convertSvgData(name, source, { forceWidth, forceHeight }) {
  const node = parse(source);


  const { properties = {}, children = [] } = node.children[0];
  // console.log('[svgrData/convert] node=%o', children);

  const result = {
    name,
    width: properties.width || 24,
    height: properties.height || 24,
    data: children.map(getChildrenData),
  };

  if (forceWidth ) {
    result.width = forceWidth;
  }

  if (forceHeight ) {
    result.height = forceHeight;
  }

  // console.log('[svgrData/convert] result=%o', result);

  return `
export const content = ${JSON.stringify (result)};
export default content;
`;
}

module.exports = {
  convertSvgData,
};
