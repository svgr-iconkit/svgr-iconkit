import React from "react";
import {
  CreateIconFactoryType,
  IconProps,
  IconBaseProps,
  IconSVG,
  IconSVGNode,
} from "./types";
import { convertReactProps, convertStyleProps, removePx } from "./utils";

// For desktop, only few attribute is supported
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
  const { content, ...restProps } = props;
  if (!content) {
    return null;
  }
  const { name, attrs, width, height, data = [] } = content;
  const { viewBox, width: orgWidth, height: orgHeight, ...restAttrs } =
    attrs || {};
  const _viewBox =
    viewBox ||
    `0 0 ${removePx(orgWidth || width)} ${removePx(orgHeight || height)}`;

  const originalProps = convertReactProps(restProps, {}, propNamesRemap);
  const attrProps = convertReactProps(restAttrs, {}, propNamesRemap);
  const _props = {
    ...originalProps,
    ...attrProps,
  };
  if (_props.style ) {
    const _style = convertStyleProps(_props.style, {});
    _props.style = _style;
  }
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
