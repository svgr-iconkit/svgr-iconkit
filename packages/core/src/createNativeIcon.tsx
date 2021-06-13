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
import { CreateIconFactoryType, IconsetSVG } from "./types";

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

export const createNativeIcon: CreateIconFactoryType = ({
  name,
  width,
  height,
  data = [],
}: IconsetSVG) => {
  const renderChildren = (nodes: any[], parentKey: string = "#") => {
    const filteredNodes = nodes.filter((node) =>
      supportedNodeNames.includes(node.name)
    );
    return filteredNodes.map(({ tagName, attrs: nodeAttrs }, index) => {
      const NodeComponent = NodeComponentMap[tagName.toLowerCase()];
      const { children = [], ...restProps } = nodeAttrs;
      const nodeKey = `${parentKey}-$${tagName}_${index}`;
      return (
        <NodeComponent
          key={nodeKey}
          {...restProps}
        >
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
        viewBox={`0 0 ${width} ${height}`}
        width={24}
        height={24}
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
