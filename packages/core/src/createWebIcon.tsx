import React from "react";
import { CreateIconFactoryType, IconsetSVG, IconsetSVGNode } from "./types";
import { camelCase } from "change-case";
import { removePx } from "./utils";

const filterNode = (node: IconsetSVGNode) => node.tagName !== "title";

export const createWebIcon: CreateIconFactoryType = ({
  name,
  viewBox,
  width: orgWidth,
  height: orgHeight,
  data = [],
}: IconsetSVG) => {
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
      const _props: any = {
        key: nodeKey,
      };

      Object.keys(attrs).forEach((propName) => {
        const convertedName = camelCase(propName);
        _props[convertedName] = attrs[propName];
      });

      return React.createElement(tagName, _props, ...childrenNodes);
    });
  };

  function SVGContent(
    props: React.SVGProps<SVGSVGElement>,
    svgRef?: React.Ref<SVGSVGElement>
  ) {
    return (
      <svg
        viewBox={viewBox || `0 0 ${removePx(orgWidth)} ${removePx(orgHeight)}`}
        ref={svgRef}
        {...props}
      >
        {renderChildren(data)}
      </svg>
    );
  }
  SVGContent.displayName = name;

  return React.memo(React.forwardRef(SVGContent));
};

export default createWebIcon;
