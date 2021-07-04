import React from "react";
import {
  CreateIconFactoryType,
  IconProps,
  IconBaseProps,
  IconSVG,
  IconSVGNode,
} from "./types";
import { convertReactProps, getViewboxValue } from "./utils";

// For web, only few attribute is supported
const propNamesRemap = {
  class: 'className',
}

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
const InternalWebIcon = React.forwardRef(function(
  props: IconProps,
  svgRef?: any
) {
  const { content, size, color, fontSize, lineHeight, style: bakStyle = {}, ...restProps } = props;
  if (!content) {
    return null;
  }
  const { attrs, data = [] } = content;
  const { fill, stroke, ...restAttrs } =
    attrs || {};
  const viewBox = getViewboxValue(content);

  const originalProps = convertReactProps(restProps, {}, propNamesRemap);
  const attrProps = convertReactProps(restAttrs, {}, propNamesRemap);
  const _props = {
    fill,
    stroke,
    ...originalProps,
    viewBox,
    ...attrProps,
  };

  // For web, it does not support array based styles
  const internalStyle: any = {};
  Object.keys(bakStyle).filter( name => !name.match(/^[0-9]+/)).forEach( name => {
    internalStyle[name] =  bakStyle[name];
  });

  if (fontSize) {
    internalStyle.width = fontSize;
    internalStyle.height = fontSize;
    internalStyle.fontSize = fontSize;
  }
  if (lineHeight) {
    internalStyle.lineHeight = lineHeight;
  }

  _props.style = internalStyle;

  if (color) {
    // For some iconset, they use stroke to styling and cannot use fill properties
    internalStyle.color = color;
  }
  
  return (
    <svg
      {..._props}
      ref={svgRef}
    >
      {renderChildren(data)}
    </svg>
  );
});
InternalWebIcon.displayName = "WebIcon";

export const WebIcon = InternalWebIcon;

export const createWebIcon: CreateIconFactoryType = (content: IconSVG) => {
  function WebIconWrapper(props: IconBaseProps, svgRef?: any) {
    return <InternalWebIcon ref={svgRef} content={content} {...props} />;
  }
  return React.forwardRef(WebIconWrapper);
};
