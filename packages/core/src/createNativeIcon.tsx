import React from "react";
import Svg, {
  SvgProps,
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
import { camelCase } from "change-case";
import { CreateIconFactoryType, IconsetSVG, IconsetSVGNode } from "./types";
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

const supportedNodeNames = Object.keys(NodeComponentMap);

const filterNode = (node: IconsetSVGNode) =>
  supportedNodeNames.includes(node.tagName);

export const createNativeIcon: CreateIconFactoryType = ({
  name,
  viewBox,
  width: orgWidth,
  height: orgHeight,
  attrs = {},
  data = [],
}: IconsetSVG) => {
  const { viewBox: _viewBox, width: _width, height: _height, ...restAttrs } = attrs;
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
        <NodeComponent  {..._props}>
          {children && children.length > 0 && renderChildren(children, nodeKey)}
        </NodeComponent>
      );
    });
  };

  function SVGContent(
    props: SvgProps,
    svgRef?: React.Ref<React.Component<SvgProps>>
  ) {
    return (
      <Svg
        viewBox={viewBox || `0 0 ${removePx(orgWidth)} ${removePx(orgHeight)}`}
        {...convertReactProps(restAttrs)}
        ref={svgRef}
        {...props}
      >
        {renderChildren(data)}
      </Svg>
    );
  }
  SVGContent.displayName = name;

  return React.memo(React.forwardRef(SVGContent));
};

export default createNativeIcon;
