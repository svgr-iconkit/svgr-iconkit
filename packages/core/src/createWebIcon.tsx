import React from "react";
import { CreateIconFactoryType, IconsetSVG } from "./types";

export const createWebIcon: CreateIconFactoryType = ({
  name,
  width,
  height,
  data = [],
}: IconsetSVG) => {
  const renderChildren = (nodes: any[], parentKey: string = "#") => {
    const filteredNodes = nodes.filter(() => true);
    return filteredNodes.map(({ name: nodeName, attrs: nodeAttrs }, index) => {
      const { children = [], ...restProps } = nodeAttrs;
      const nodeKey = `${parentKey}-$${nodeName}_${index}`;

      let childrenNodes: any[] = [];
      if (children && children.length > 0) {
        childrenNodes = renderChildren(children, nodeKey);
      }

      return React.createElement(nodeName, restProps, ...childrenNodes)
    });
  };

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
        {renderChildren(data)}
      </svg>
    );
  }
  SVGContent.displayName = name;

  return React.forwardRef(SVGContent);
};

export default createWebIcon;
