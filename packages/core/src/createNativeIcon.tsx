import React from "react";
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
import {
  ResolveType,
  CreateIconFactoryType,
  IconContentBaseProps,
  IconProps,
  IconSVG,
  IconSVGNode,
} from "./types";
import {
  convertReactProps,
  getContentFromIconProps,
  getViewboxValue,
  PRIMARY_CURRENT_COLOR,
  removeUnit,
  showDebugWarning,
} from "./utils";

const NodeComponentMap: Record<string, React.ComponentClass<any>> = {
  path: Path,
  line: Line,
  text: Text,
  g: G,
  defs: Defs,
  use: Use,
  lineargradient: LinearGradient,
  radialgradient: RadialGradient,
  pattern: Pattern,
  marker: Marker,
  textpath: TextPath,
  tspan: TSpan,
  clippath: ClipPath,
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
  style: null,
};

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

    const _props: any = convertReactProps(attrs, {
      key: nodeKey,
    });
    return (
      <NodeComponent {..._props}>
        {children && children.length > 0 && renderChildren(children, nodeKey)}
      </NodeComponent>
    );
  });
};

const InternalNativeIcon = React.forwardRef(function<
  IconNames extends string,
  IconVariant extends string
>(props: IconProps<IconNames, IconVariant>, svgRef?: any) {
  const {
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

  const style: ViewStyle = propsStyle || {};
  const internalStyle: TextStyle = {};
  if (color && colorize) {
    // For some iconset, they use stroke to styling and cannot use fill properties
    internalStyle.color = color;
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

export const NativeIcon = React.memo(InternalNativeIcon);

/**
 * Create renderable icon by content
 * @param {IconSVG} content;
 * @returns {React.ComponentType<IconBaseProps>}
 */
export const createNativeIcon: CreateIconFactoryType = (content: IconSVG) => {
  function NativeIconWrapper(props: IconContentBaseProps, svgRef?: any) {
    return (
      <NativeIcon
        resolveType={ResolveType.Content}
        ref={svgRef}
        content={content}
        {...props}
      />
    );
  }
  return React.forwardRef(NativeIconWrapper);
};
