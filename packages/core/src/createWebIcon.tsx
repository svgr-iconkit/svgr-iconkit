import React from "react";
import {
  CreateIconFactoryType,
  IconProps,
  IconContentBaseProps,
  IconSVG,
  IconSVGNode,
  ResolveType,
} from "./types";
import {
  convertReactProps,
  getContentFromIconProps,
  getViewboxValue,
  filterNonNubmerOnlyString,
  appendUnit,
  PRIMARY_CURRENT_COLOR,
  filterNonEmptyString,
  showDebugWarning,
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
    size,
    color,
    colorize = true,
    fontSize,
    lineHeight,
    style: bakStyle = {},
    ...restProps
  } = props;
  const svgContent = getContentFromIconProps(props);
  if (!svgContent) {
    if (props.variant && props.name) {
      showDebugWarning(
        `Icon was not found by given name ${props.name} and variant ${props.variant}`
      );
    } else if (props.name) {
      showDebugWarning(`Icon was not found by given name ${props.name}`);
    }
    return null;
  }

  const { attrs: svgAttrs, data: svgData = [] } = svgContent;
  const { fill, stroke, width: svgWidth, height: svgHeight, ...restAttrs } =
    svgAttrs || {};
  const viewBox = getViewboxValue(svgContent);

  const iconProps = convertReactProps(restProps, {}, propNamesRemap);
  const attrProps = convertReactProps(restAttrs, {}, propNamesRemap);
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
      {renderChildren(svgData)}
    </svg>
  );
});
InternalWebIcon.displayName = "WebIcon";

export const WebIcon = React.memo(InternalWebIcon);
/**
 * Create renderable icon by content
 * @param {IconSVG} content;
 * @returns {React.ComponentType<IconBaseProps>}
 */
export const createWebIcon: CreateIconFactoryType = (content: IconSVG) => {
  function WebIconWrapper(props: IconContentBaseProps, svgRef?: any) {
    return (
      <WebIcon
        resolveType={ResolveType.Content}
        ref={svgRef}
        content={content}
        {...props}
      />
    );
  }
  return React.forwardRef(WebIconWrapper);
};
