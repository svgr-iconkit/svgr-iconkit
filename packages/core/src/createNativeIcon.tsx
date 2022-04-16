import React, { memo, forwardRef, ComponentClass, ForwardedRef, Component, Ref, PropsWithChildren } from "react";
import { TextStyle, ViewStyle } from "react-native";
import Svg, {
  Path,
  Circle,
  Rect,
  Line,
  Text,
  Polyline,
  Polygon,
  Ellipse,
  G,
  TSpan,
  ClipPath,
  Mask,
  Defs,
  Use,
  LinearGradient,
  RadialGradient,
  Pattern,
  Marker,
  TextPath,
  Stop,
} from "react-native-svg";
import type { SvgProps } from "react-native-svg";
import type {
  CreateIconFactoryType,
  IconContentBaseProps,
  IconProps,
  IconSVG,
  IconSVGNode,
} from "./types";
import {
  ResolveType,
} from "./types"
import {
  createConvertReactProps,
  filterNonEmptyString,
  getContentFromIconProps,
  getViewboxValue,
  PRIMARY_CURRENT_COLOR,
  removeUnit,
  showDebugWarning,
} from "./utils";

const NodeComponentMap: Record<string, ComponentClass<any>> = {
  path: Path,
  line: Line,
  text: Text,
  g: G,
  defs: Defs,
  use: Use,
  lineargradient: LinearGradient,
  lieearGradient: LinearGradient,
  radialgradient: RadialGradient,
  radialGraident: RadialGradient,
  pattern: Pattern,
  marker: Marker,
  textpath: TextPath,
  tspan: TSpan,
  tSpan: TSpan,
  clippath: ClipPath,
  clipPath: ClipPath,
  stop: Stop,
  mask: Mask,
  circle: Circle,
  ellipse: Ellipse,
  rect: Rect,
  polyline: Polyline,
  polygon: Polygon,
};
// For native, only few attribute is supported
const propNamesRemap = {
  class: "className",
  "xmlns:xlink": "xmlnsXlink",
  "xlink:href": "xlinkHref",
  "strokeWidth": "strokeWidth",
  "strokeLinecap": "strokeLinecap",
  "strokeLinejoin": "strokeLinejoin",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-width": "strokeWidth",
  style: null,
};

const convertProps = createConvertReactProps(propNamesRemap)

const supportedNodeNames = Object.keys(NodeComponentMap);

const filterNode = (node: IconSVGNode) =>
  supportedNodeNames.includes(node.tagName);

/**
 * Travel children node
 */
const renderChildren = (nodes: any[], parentKey: string = "#") => {
  const filteredNodes = nodes.filter(filterNode);
  return filteredNodes.map((node, index) => {
    const { tagName, attrs, children } = node;
    const NodeComponent = NodeComponentMap[tagName.toLowerCase()];
    const nodeKey = `${parentKey}/$${tagName}_${index}`;

    const _props: any = convertProps(attrs, {
      key: nodeKey,
    });
    return (
      <NodeComponent {..._props}>
        {children && children.length > 0 && renderChildren(children, nodeKey)}
      </NodeComponent>
    );
  });
};

export type NativeIconForwaredRefType = Component<SvgProps>

const InternalNativeIcon = forwardRef(function <
  IconNames extends string,
  IconVariant extends string
>(props: PropsWithChildren<IconProps<IconNames, IconVariant>>, svgRef: ForwardedRef<NativeIconForwaredRefType>) {
  const {
    name,
    variant,
    size,
    color,
    colorize = true,
    fontSize,
    lineHeight,
    style: propsStyle,
    ...restProps
  } = props;
  const svgContent = getContentFromIconProps(props);
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

  const { attrs: svgAttrs, data: svgData = [] } = svgContent;
  const { fill, stroke, width: svgWidth, height: svgHeight, ...restAttrs } =
    svgAttrs || {};
  const viewBox = getViewboxValue(svgContent);

  const iconProps = convertProps(restProps, {}, {allowNonWhitelistProp: false});
  const attrProps = convertProps(restAttrs, {}, {allowNonWhitelistProp: false});
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

  const style: ViewStyle = propsStyle || {};
  const internalStyle: TextStyle = {};
  if (color && colorize) {
    // For some iconset, they use stroke to styling and cannot use fill properties
    internalStyle.color = color;
  }
  if (filterNonEmptyString(svgWidth)) {
    internalStyle.width = (svgWidth);
  }
  if (filterNonEmptyString(svgHeight)) {
    internalStyle.height = (svgHeight);
  }
  if (size) {
    internalStyle.width = removeUnit(size);
    internalStyle.height = removeUnit(size);
  }
  if (fontSize) {
    internalStyle.width = removeUnit(fontSize);
    internalStyle.height = removeUnit(fontSize);
    internalStyle.fontSize = Number(removeUnit(fontSize));
  }
  if (lineHeight) {
    internalStyle.lineHeight = Number(removeUnit(lineHeight));
  }
  internalProps.style = [internalStyle, style];
  return (
    <Svg {...internalProps} ref={svgRef}>
      {renderChildren(svgData)}
    </Svg>
  );
});
InternalNativeIcon.displayName = "NativeIcon";

export const NativeIcon = memo(InternalNativeIcon);

/**
 * Create renderable icon by content
 * @param {IconSVG} content;
 * @returns {React.ComponentType<IconBaseProps>}
 */
export const createNativeIcon: CreateIconFactoryType<NativeIconForwaredRefType, IconContentBaseProps> = (content: IconSVG) => {

  return forwardRef((props: IconContentBaseProps, svgRef: Ref<NativeIconForwaredRefType>) => {
    return (
      <NativeIcon
        resolveType={ResolveType.Content}
        ref={svgRef}
        content={content}
        {...props}
      />
    );
  });
};
