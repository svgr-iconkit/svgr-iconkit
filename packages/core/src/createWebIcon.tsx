import React from "react";
import {
  CreateIconFactoryType,
  IconProps,
  IconBaseProps,
  IconSVG,
  IconSVGNode,
} from "./types";
import {
  convertReactProps,
  getContentFromIconProps,
  getViewboxValue,
} from "./utils";

// For web, only few attribute is supported
const propNamesRemap = {
  class: "className",
};

const filterNode = (node: IconSVGNode) => node.tagName !== "title";
/**
 * Travel children node
 */
const renderChildren = (nodes: any[], parentKey: string = "#") => {
  const filteredNodes = nodes.filter(filterNode);
  return filteredNodes.map((node, index) => {
    const { tagName, attrs, children } = node;
    const nodeKey = `${parentKey}/$${tagName}_${index}`;

    let childrenNodes: any[] = [];
    if (children && children.length > 0) {
      childrenNodes = renderChildren(children, nodeKey);
    }
    const _props: any = convertReactProps(attrs, {
      key: nodeKey,
    });

    return React.createElement(tagName, _props, ...childrenNodes);
  });
};
const InternalWebIcon = React.forwardRef(function<
  IconNames extends string,
  IconVariant extends string
>(props: IconProps<IconNames, IconVariant>, svgRef?: any) {
  const {
    content,
    map = {},
    variant,
    defaultVariant,
    size,
    color,
    fontSize,
    lineHeight,
    style: bakStyle = {},
    ...restProps
  } = props;
  const _content = getContentFromIconProps(props);
  if (!_content) {
    return null;
  }

  const { attrs, data = [] } = _content;
  const { fill, stroke, width: svgWidth, height: svgHeight, ...restAttrs } =
    attrs || {};
  const viewBox = getViewboxValue(_content);

  const iconProps = convertReactProps(restProps, {}, propNamesRemap);
  const attrProps = convertReactProps(restAttrs, {}, propNamesRemap);
  const internalProps = {
    fill,
    stroke,
    ...attrProps,
    viewBox,
    ...iconProps,
  };

  if (fill !== "none") {
    internalProps.fill = "currentColor";
  }

  // For web, it does not support array based styles
  const internalStyle: any = {};
  Object.keys(bakStyle)
    .filter((name) => !name.match(/^[0-9]+/))
    .forEach((name) => {
      internalStyle[name] = bakStyle[name];
    });

  if (size) {
    internalStyle.width = size + "px";
    internalStyle.height = size + "px";
    internalStyle.fontSize = size + "px";
  }
  if (fontSize) {
    internalStyle.width = fontSize;
    internalStyle.height = fontSize;
    internalStyle.fontSize = fontSize;
  }
  if (lineHeight) {
    internalStyle.lineHeight = lineHeight;
  }

  internalProps.style = internalStyle;

  if (color) {
    // For some iconset, they use stroke to styling and cannot use fill properties

    // Respect on provided color from react-native-web
    if (!internalStyle.color) {
      internalStyle.color = color;
    }
  }

  return (
    <svg {...internalProps} ref={svgRef}>
      {renderChildren(data)}
    </svg>
  );
});
InternalWebIcon.displayName = "WebIcon";

export const WebIcon = React.memo(InternalWebIcon);

export const createWebIcon: CreateIconFactoryType = (content: IconSVG) => {
  function WebIconWrapper(props: IconBaseProps, svgRef?: any) {
    return <WebIcon ref={svgRef} content={content} {...props} />;
  }
  return React.forwardRef(WebIconWrapper);
};
