import React from "react";

export type IconComponentClass<IconNames extends string> = React.ForwardRefExoticComponent<IconsetProps<IconNames>>;


export type IconsetSVGNode = {
  tagName: string;
  attrs: Record<string, string | number>;
  children?: IconsetSVGNode[];
};

export type IconsetSVG = {
  name: string;
  width: number;
  height: number;
  data: IconsetSVGNode[];
};

export type IconsMapType<IconNames extends string> = Record<
  IconNames,
  IconsetSVG
>;

export interface IconsetBaseProps<IconNames extends string> {
  name: IconNames;
  width?: string | number;
  height?: string | number;
  className?: string | number;
  style?: string | object;
  id?: string;
  fill?: string;
  stroke?: string;
  ["data-testid"]?: string;
}

export type IconsetProps<IconNames extends string> =
  | (React.ReactSVGElement & IconsetBaseProps<IconNames>)
  | React.ReactElement<IconsetBaseProps<IconNames>>;

export type CreateIconsetOptions<IconNames extends string> = {
  familyName: string;
  map: IconsMapType<IconNames>;
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
  width: number;
  height: number;
  data: SVGNode[];
};


export type CreateIconFactoryType = (iconProps: IconsetSVG) => React.ForwardRefExoticComponent<any>;
