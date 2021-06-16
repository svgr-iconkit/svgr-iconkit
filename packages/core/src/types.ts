import React, { CSSProperties } from "react";

export type IconComponentClass<IconNames extends string, IconVariant extends string> = React.ForwardRefExoticComponent<IconsetProps<IconNames, IconVariant>>;

export type IconSVGNode = {
  tagName: string;
  attrs: Record<string, string | number>;
  children?: IconSVGNode[];
};

export type IconSVG = {
  name: string;
  viewBox?: string;
  width?: string | number;
  height?: string | number;
  attrs?: any;
  data: IconSVGNode[];
};
/** Backward compitable */
/**
 * @deprecated Use IconSVGNode
 */
export type IconsetSVGNode = IconSVGNode;

/**
 * @deprecated Use IconSVG
 */
export type IconsetSVG = IconSVG;

export type IconsMapType<IconNames extends string> = Record<
  IconNames,
  IconSVG
>;

export interface IconBaseProps {
  width?: string | number;
  height?: string | number;
  className?: string | number;
  style?: Record<string, any>;
  id?: string;
  fill?: string;
  stroke?: string;
  ["data-testid"]?: string;
  size?: string | number;
  color?: string;
}

export interface IconsetBaseProps<IconNames extends string, IconVariant extends string> extends IconBaseProps {
  name: IconNames;
  variant?: IconVariant;
}

export type IconsetProps<IconNames extends string, IconVariant extends string> =
  | (React.ReactSVGElement & IconsetBaseProps<IconNames, IconVariant>)
  | React.ReactElement<IconsetBaseProps<IconNames, IconVariant>>;

export type CreateIconsetOptions<IconNames extends string, IconVariant extends string> = {
  familyName: string;
  map: IconsMapType<IconNames> | Record<IconVariant, IconsMapType<IconNames>>;
  variants?: IconVariant[];
  defaultVariant?: IconVariant;
};

export type CreateIconOptions = {
  name: string;
  width: number;
  height: number;
  path: string;
};


export type SVGNode = {
  name: string;
  attrs: Record<string, string | number>;
};

export type SVGIconNode = {
  name: string;
  viewBox: string;
  data: SVGNode[];
};


export type CreateIconFactoryType = (iconProps: IconSVG) => React.ForwardRefExoticComponent<any>;
