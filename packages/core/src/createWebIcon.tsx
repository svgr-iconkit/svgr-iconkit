import React from "react";
import { CreateIconFactoryType, IconBaseProps, IconSVG, IconSVGNode } from "./types";
import { convertReactProps, removePx } from "./utils";

const filterNode = (node: IconSVGNode) => node.tagName !== "title";

export const createWebIcon: CreateIconFactoryType = ({
  name,
  viewBox,
  width: orgWidth,
  height: orgHeight,
  attrs = {},
  data = [],
}: IconSVG) => {
  const { viewBox: _viewBox, width: _width, height: _height, ...restAttrs } = attrs;
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

  function SVGContent(
    props: React.SVGProps<SVGSVGElement>,
    svgRef?: React.Ref<SVGSVGElement>
  ) {
    return (
      <svg
        viewBox={viewBox || `0 0 ${removePx(orgWidth)} ${removePx(orgHeight)}`}
        {...convertReactProps(restAttrs)}
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


export function WebIcon({content, ...restProps}: {content: IconSVG} & IconBaseProps) {
  const Icon = createWebIcon(content);
  return <Icon {...restProps} />;
}

export default createWebIcon;
