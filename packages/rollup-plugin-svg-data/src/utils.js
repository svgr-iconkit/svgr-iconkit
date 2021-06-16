const { parse } = require("svg-parser");

const disallowedAttributeNames = ["xmlns", "class", "className", "style"];

function isAllowedAttributeName(name) {
  if (disallowedAttributeNames.includes(name)) return false;
  if (name.indexOf(":") > -1) {
    return false;
  }
  return true;
}

function filterOnlyElement(node) {
  if (!node) return false;
  if (node.type !== "element") return false;
  if (!node.tagName) return false;
  return true;
}

function getChildrenData(node) {
  if (!node) {
    console.error("Empty node reported");
    throw new Error("Unexcepted undefined node");
  }
  const {tagName, properties, children} = node;
  if (!tagName) {
    console.error("Empty node tagName. node=%o", node);
    throw new Error("Unexcepted node without tagName");
  }
  const attrs = {};
  Object.keys(properties)
    .filter(isAllowedAttributeName)
    .forEach((propertyName) => {
      attrs[propertyName] = properties[propertyName];
    });
  if ( attrs.fill && attrs.fill !== "none" ) {
    attrs.fill = 'currentColor';
  }

  const hasChildren =
    children && Array.isArray(children) && children.length > 0;
  return {
    tagName,
    attrs,
    children: !hasChildren
      ? undefined
      : children.filter(filterOnlyElement).map(getChildrenData),
  };
}

function convertSvgData(name, source, { forceWidth, forceHeight }) {
  const node = parse(source);

  const { type, tagName, properties = {}, children = [] } = node.children[0];

  if (type !== "element") {
    console.warn(
      "[svgrData/convert] unexcepted root children. node=%o",
      node
    );
    process.exit(1);
    return;
  } 

  if (!children) {
    console.warn(
      "[svgrData/convert] unable to handle undefined root children. node=%o",
      node
    );
    process.exit(1);
    return;
  }

  const result = {
    name,
    width: properties.width,
    height: properties.height,
    viewBox: properties.viewBox,
    attrs: properties,
    data: children.filter(filterOnlyElement).map(getChildrenData),
  };

  if (forceWidth) {
    result.width = forceWidth;
  }

  if (forceHeight) {
    result.height = forceHeight;
  }

  // console.log('[svgrData/convert] result=%o', result);

  return `
export const content = ${JSON.stringify(result)};
export default content;
`;
}

module.exports = {
  convertSvgData,
};
