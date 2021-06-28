import React from "react";
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
  CreateIconFactoryType,
  IconBaseProps,
  IconProps,
  IconSVG,
  IconSVGNode,
} from "./types";
import { convertReactProps, removePx } from "./utils";

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
  class: 'className',
}

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

const InternalNativeIcon = React.forwardRef(
  (props: IconProps, svgRef?: any) => {
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
      const style = _props.style ? [_props.style] : [];
      const internalStyle: any = {};
    
      if (size) {
        _props.width = size;
        _props.height = size;
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
      _props.style = style.concat([internalStyle]);
    return (
      <Svg
        viewBox={_viewBox}
        {...convertReactProps(restProps)}
        {...convertReactProps(restAttrs)}
        ref={svgRef}
      >
        {renderChildren(data)}
      </Svg>
    );
  }
);
InternalNativeIcon.displayName = "NativeIcon";

export const NativeIcon = InternalNativeIcon;

export const createNativeIcon: CreateIconFactoryType = (content: IconSVG) => {
  function NativeIconWrapper(props: IconBaseProps, svgRef?: any) {
    return <NativeIcon ref={svgRef} content={content} {...props} />;
  }
  return React.forwardRef(NativeIconWrapper);
};
