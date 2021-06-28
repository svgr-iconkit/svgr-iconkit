import { parse } from "svg-parser";

const disallowedTagNames = ["defs", "style", "title"];
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
  if (disallowedTagNames.includes(node.tagName.toLowerCase())) return false;
  return true;
}

function getChildrenData(node, options) {
  if (!node) {
    console.error("Empty node reported");
    throw new Error("Unexcepted undefined node");
  }
  const { tagName, properties, children } = node;
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

  const { fillColor, strokeColor } = options;

  // Overwrite colors when attributes exist (if non-none)
  if (fillColor) {
    if (attrs.fill && attrs.fill !== "none") {
      attrs.fill = fillColor;
    }
  }
  if (strokeColor) {
    if (attrs.stroke && attrs.stroke !== "none") {
      attrs.stroke = strokeColor;
    }
  }

  const hasChildren =
    children && Array.isArray(children) && children.length > 0;
  return {
    tagName,
    attrs,
    children: !hasChildren
      ? undefined
      : children
          .filter(filterOnlyElement)
          .map((node) => getChildrenData(node, options)),
  };
}

export function convertSvgData(
  name,
  source,
  { fillColor, strokeColor, forceWidth, forceHeight, typescript = false }
) {
  const node = parse(source);

  const { type, tagName, properties = {}, children = [] } = node.children[0];

  if (type !== "element") {
    console.warn("[svgrData/convert] unexcepted root children. node=%o", node);
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

  const attrs = {};
  Object.keys(properties)
    .filter(isAllowedAttributeName)
    .forEach((propertyName) => {
      attrs[propertyName] = properties[propertyName];
    });

  const result = {
    name,
    attrs,
    data: children
      .filter(filterOnlyElement)
      .map((node) => getChildrenData(node, { fillColor, strokeColor })),
  };

  if (forceWidth) {
    result.attrs.width = forceWidth;
  }

  if (forceHeight) {
    result.attrs.height = forceHeight;
  }

  const contentStr = JSON.stringify(result);
  if (typescript) {
    return `
import { IconSVG } from "@svgr-iconkit/core";
export const content: IconSVG = ${contentStr};
export default content;
`;
  }

  return `
export const content = ${contentStr};
export default content;
`;
}
