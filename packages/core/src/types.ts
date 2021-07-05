import React, { CSSProperties } from "react";

export type IconComponentClass<
  IconNames extends string,
  IconVariant extends string
> = React.ForwardRefExoticComponent<IconsetProps<IconNames, IconVariant>>;

export type IconSVGNode = {
  tagName: string;
  attrs?: Record<string, any>;
  children?: IconSVGNode[];
};

export type IconSVG = {
  name: string;
  width?: number;
  height?: number;
  attrs?: Record<string, any>;
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

export type IconsMapType<IconNames extends string> = Record<IconNames, IconSVG>;

export type IconsetMap<IconNames extends string, IconVariant extends string> =
  | Record<IconVariant, IconsMapType<IconNames>>
  | { [key: string]: IconsMapType<IconNames | string> };

export interface IconBaseProps {
  width?: string | number;
  height?: string | number;
  className?: string | number;
  style?: Record<string, any>;
  id?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  strokeLinecap?: string;
  strokeLinejoin?: string;
  ["data-testid"]?: string;
  ["testID"]?: string;
  size?: string | number;
  lineHeight?: string | number;
  fontSize?: string | number;
  color?: string;
}

export interface IconsetBaseProps<
  IconNames extends string,
  IconVariant extends string
> extends IconBaseProps {
  name: IconNames;
  variant?: IconVariant;
}

export type IconProps<IconNames extends string, IconVariant extends string> = {
  content?: IconSVG;
  name?: IconNames;
  map?: IconsetMap<IconNames, IconVariant>;
  variant?: IconVariant;
  defaultVariant?: IconVariant;
} & IconBaseProps;

export type IconsetProps<
  IconNames extends string,
  IconVariant extends string
> =
  | (React.ReactSVGElement & IconsetBaseProps<IconNames, IconVariant>)
  | React.ReactElement<IconsetBaseProps<IconNames, IconVariant>>;

export type CreateIconsetOptions<
  IconNames extends string,
  IconVariant extends string
> = {
  familyName: string;
  map: IconsetMap<IconNames, IconVariant>;
  variants?: IconVariant[];
  defaultVariant?: IconVariant;
};

export type CreateIconFactoryType = (
  iconProps: IconSVG
) => React.ForwardRefExoticComponent<any>;
