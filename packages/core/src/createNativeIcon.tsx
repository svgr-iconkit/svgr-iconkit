import React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { CreateIconOptions } from "./types";

export const createNativeIcon = ({
  name,
  width,
  height,
  path,
}: CreateIconOptions) => {
  function SVGContent(
    props: SvgProps,
    svgRef?: React.Ref<React.Component<SvgProps>>
  ) {
    return (
      <Svg
        viewBox={`0 0 ${width} ${height}`}
        width="1em"
        height="1em"
        ref={svgRef}
        {...props}
      >
        <Path d={path} />
      </Svg>
    );
  }
  SVGContent.displayName = name;

  return React.forwardRef(SVGContent);
};
