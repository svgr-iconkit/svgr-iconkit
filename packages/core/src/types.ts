import React from "react";

export type IconComponentClass<IconNames extends string, IconVariant extends string> = React.ForwardRefExoticComponent<IconsetProps<IconNames, IconVariant>>;

export type IconsetSVGNode = {
  tagName: string;
  attrs: Record<string, string | number>;
  children?: IconsetSVGNode[];
};

export type IconsetSVG = {
  name: string;
  viewBox?: string;
  width?: string | number;
  height?: string | number;
  data: IconsetSVGNode[];
};

export type IconsMapType<IconNames extends string> = Record<
  IconNames,
  IconsetSVG
>;

export interface IconsetBaseProps<IconNames extends string, IconVariant extends string> {
  name: IconNames;
  width?: string | number;
  height?: string | number;
  className?: string | number;
  variant?: IconVariant;
  style?: string | object;
  id?: string;
  fill?: string;
  stroke?: string;
  ["data-testid"]?: string;
  size?: string | number;
  color?: string;
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


export type CreateIconFactoryType = (iconProps: IconsetSVG) => React.ForwardRefExoticComponent<any>;
