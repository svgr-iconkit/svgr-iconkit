import React, { createElement, memo, forwardRef, useMemo } from "react";
import type { Ref, ForwardedRef, PropsWithChildren } from "react"
import type {
  CreateIconFactoryType,
  IconProps,
  IconContentBaseProps,
  IconSVG,
  IconSVGNode,
} from "./types";
import {
  ResolveType,
} from "./types";
import {
  createConvertReactProps,
  getContentFromIconProps,
  getViewboxValue,
  appendUnit,
  PRIMARY_CURRENT_COLOR,
  filterNonEmptyString,
  showDebugWarning,
} from "./utils";


// For web, only few attribute is supported
const propNamesRemap = {
  class: "className",
  className: "className",
  "strokeWidth": "strokeWidth",
  "strokeLinecap": "strokeLinecap",
  "strokeLinejoin": "strokeLinejoin",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-width": "strokeWidth",
  style: null,
};

const convertRunner = createConvertReactProps(propNamesRemap)

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
    const _props: any = convertRunner(attrs, {
      key: nodeKey,
    });

    return createElement(tagName, _props, ...childrenNodes);
  });
};

export type WebIconForwaredRefType = SVGSVGElement

const InternalWebIcon = forwardRef(function <
  IconNames extends string,
  IconVariant extends string
>(props: IconProps<IconNames, IconVariant>, svgRef: ForwardedRef<WebIconForwaredRefType>) {
  const {
    name,
    variant,
    size,
    color,
    colorize = true,
    fontSize,
    lineHeight,
    style: bakStyle = {},
    ...restProps
  } = props;
  const svgContent = getContentFromIconProps(props);
  const { attrs: svgAttrs, data: svgData = [] } = svgContent || {};
  const elements = renderChildren(svgData);
  if (!svgContent) {
    if (variant && name) {
      showDebugWarning(
        `Icon was not found by given name ${name} and variant ${variant}`
      );
    } else if (name) {
      showDebugWarning(`Icon was not found by given name ${name}`);
    }
    return null;
  }

  const { fill, stroke, width: svgWidth, height: svgHeight, ...restAttrs } =
    svgAttrs || {};
  const viewBox = getViewboxValue(svgContent);

  const iconProps = convertRunner(restProps, {}, { allowNonWhitelistProp: false });
  const attrProps = convertRunner(restAttrs, {}, { allowNonWhitelistProp: false });
  const internalProps = {
    fill,
    stroke,
    ...attrProps,
    viewBox,
    ...iconProps,
  };

  if (fill !== "none" && colorize) {
    internalProps.fill = PRIMARY_CURRENT_COLOR;
  }

  // For web, it does not support array based styles
  const internalStyle: any = {};

  if (color && colorize) {
    // For some iconset, they use stroke to styling and cannot use fill properties
    internalStyle.color = color;
  }

  if (filterNonEmptyString(svgWidth)) {
    internalProps.width = (svgWidth);
  }
  if (filterNonEmptyString(svgHeight)) {
    internalProps.height = (svgHeight);
  }
  if (filterNonEmptyString(size)) {
    internalProps.width = appendUnit(size);
    internalProps.height = appendUnit(size);
  }
  if (filterNonEmptyString(fontSize)) {
    internalProps.width = fontSize;
    internalProps.height = fontSize;
    internalStyle.fontSize = fontSize;
    internalStyle.lineHeight = fontSize;
  }
  if (filterNonEmptyString(lineHeight)) {
    internalStyle.lineHeight = lineHeight;
  }

  internalProps.style = internalStyle;
  if (bakStyle) {
    internalProps.style = { ...internalStyle, ...bakStyle };
  }

  return (
    <svg {...internalProps} ref={svgRef}>
      {elements}
    </svg>
  );
});

export type WebIconContentForwaredRefType = SVGGElement

export const WebIconContent = memo(forwardRef(<
  IconNames extends string,
  IconVariant extends string
>(props: IconProps<IconNames, IconVariant>, svgRef: ForwardedRef<WebIconForwaredRefType>) => {
  const {
    name,
    variant,
    className,
    ...restProps
  } = props;
  const svgContent = getContentFromIconProps(props);
  const { attrs = {}, data: svgData = [] } = svgContent || {};
  const elements = useMemo(() => renderChildren(svgData), [svgData]);
  if (!svgContent) {
    if (variant && name) {
      showDebugWarning(
        `Icon was not found by given name ${name} and variant ${variant}`
      );
    } else if (name) {
      showDebugWarning(`Icon was not found by given name ${name}`);
    }
    return null;
  }

  return <g ref={svgRef} viewBox={attrs.viewBox} {...restProps}>
    {elements}
  </g>
}));

export const WebIcon = memo(InternalWebIcon);
/**
 * Create renderable icon by content
 * @param {IconSVG} content;
 * @returns {React.ComponentType<IconBaseProps>}
 */
export const createWebIcon: CreateIconFactoryType<WebIconForwaredRefType, IconContentBaseProps> = (content: IconSVG) => {
  function WebIconWrapper(props: IconContentBaseProps, svgRef: Ref<WebIconForwaredRefType>) {
    return (
      <WebIcon
        resolveType={ResolveType.Content}
        ref={svgRef}
        content={content}
        {...props}
      />
    );
  }
  return forwardRef(WebIconWrapper);
};
