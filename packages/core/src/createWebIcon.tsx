import React from "react";
import { CreateIconOptions } from "./types";

export const createWebIcon = ({
  name,
  width,
  height,
  path,
}: CreateIconOptions) => {
  function SVGContent(
    props: React.SVGProps<SVGSVGElement>,
    svgRef?: React.Ref<SVGSVGElement>
  ) {
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="1em"
        height="1em"
        ref={svgRef}
        {...props}
      >
        <path d={path} />
      </svg>
    );
  }
  SVGContent.displayName = name;

  return React.forwardRef(SVGContent);
};
