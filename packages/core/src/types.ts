import React from "react";

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

export type IconsetMap<
  IconNames extends string,
  IconVariant extends string = string
> =
  | Record<IconVariant, IconsMapType<IconNames>>
  | { [key: string]: IconsMapType<IconNames | string> };

export interface IconContentBaseProps {
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
> extends IconContentBaseProps {
  name: IconNames;
  variant?: IconVariant;
}

export enum ResolveType {
  VariantMap = "variant-map",
  ContentMap = "content-map",
  Content = "content",
}

export type IconBaseProps<
  IconNames extends string,
  IconVariant extends string = string
> = {
  resolveType?: ResolveType;
  name?: IconNames;
  colorize?: boolean;
  variantsMap?: IconsetMap<IconNames, IconVariant>;
  map?: IconsMapType<IconNames>;
  variant?: IconVariant;
  defaultVariant?: IconVariant;
};

export type IconProps<
  IconNames extends string,
  IconVariant extends string = string
> = {
  content?: IconSVG;
} & IconBaseProps<IconNames, IconVariant> &
  IconContentBaseProps;

export type IconsetProps<
  IconNames extends string,
  IconVariant extends string = string
> =
  | (React.ReactSVGElement & IconsetBaseProps<IconNames, IconVariant>)
  | React.ReactElement<IconsetBaseProps<IconNames, IconVariant>>;

export type CreateIconsetOptions<
  IconNames extends string,
  IconVariant extends string
> = {
  familyName: string;
} & IconBaseProps<IconNames, IconVariant>;

export type CreateIconFactoryType = (
  iconProps: IconSVG
) => React.ForwardRefExoticComponent<any>;

export type CreateIconsetFactoryResponseType<
  IconNames extends string = string,
  IconVariant extends string = string
> = React.ForwardRefExoticComponent<
  IconsetBaseProps<IconNames, IconVariant> & React.RefAttributes<unknown>
>;

export type CreateFamilyOptions<
  IconNames extends string = string,
  IconVariant extends string = string
> = {
  familyName: string;
  colorize?: boolean;
  variantsMap: Record<IconVariant, IconsMapType<IconNames>>;
  defaultVariant?: IconVariant;
};

export type CreateVariantsMapOptions<
  IconNames extends string = string,
  IconVariant extends string = string
> = {
  familyName: string;
  colorize?: boolean;
  variantNames: IconVariant[];
  variantsMap: Record<IconVariant, IconsMapType<IconNames>>;
};
