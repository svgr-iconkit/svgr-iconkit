import React from "react";
import {
  CreateIconFactoryType,
  IconProps,
  IconBaseProps,
  IconSVG,
  IconSVGNode,
} from "./types";
import { convertReactProps, convertStyleProps, removePx } from "./utils";

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
  const { content, size, color, ...restProps } = props;
  if (!content) {
    return null;
  }
  const { attrs, width, height, data = [] } = content;
  const { viewBox, width: orgWidth, height: orgHeight, fill, stroke, ...restAttrs } =
    attrs || {};
  const _viewBox =
    viewBox ||
    `0 0 ${removePx(orgWidth || width)} ${removePx(orgHeight || height)}`;

  const originalProps = convertReactProps(restProps, {}, propNamesRemap);
  const attrProps = convertReactProps(restAttrs, {}, propNamesRemap);
  const _props = {
    fill,
    stroke,
    ...originalProps,
    ...attrProps,
  };
  const internalStyle = convertStyleProps(_props.style || {}, {});

  if (size) {
    internalStyle.width = size;
    internalStyle.height = size;
  }
  if (
    fill !== "none"
  ) {
    _props.fill = "currentColor";
  }
  if (color) {
    // For some iconset, they use stroke to styling and cannot use fill properties
    if (
      fill !== "none"
    ) {
      _props.fill = color;
    }
    internalStyle.color = color;
  }
  _props.style = internalStyle;
  
  return (
    <svg
      viewBox={_viewBox}
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
