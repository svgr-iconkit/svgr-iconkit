import React from "react";
import {
  ResolveType,
  IconsetBaseProps,
  CreateIconsetOptions,
  CreateIconsetFactoryResponseType,
  IconProps,
} from "./types";
import { getContentFromIconProps } from "./utils";

export function createIconsetFactory<
  IconNames extends string = string,
  IconVariant extends string = string
>(
  options: CreateIconsetOptions<IconNames, IconVariant>,
  BaseIconComponent: React.ComponentType<IconProps<IconNames, IconVariant>>
): CreateIconsetFactoryResponseType<IconNames, IconVariant> {
  const {
    familyName,
    resolveType = ResolveType.VariantMap,
    defaultVariant,
    variant = defaultVariant,
    colorize = false,
  } = options;

  let componentName = `${familyName}`;
  if (resolveType === ResolveType.ContentMap) {
    componentName = `${familyName}-${variant}`;
  }

  let displayName = `IconsetFamily(${componentName})`;
  if (resolveType === ResolveType.ContentMap) {
    displayName = `IconsetVariant(${componentName})`;
  }

  const Iconset = (
    props: IconsetBaseProps<IconNames, IconVariant>,
    ref: any
  ) => {
    const { name, ...restProps } = props; // select target variant or assume there is no varaint from iconsmap data
    const content = getContentFromIconProps({
      ...options,
      name,
      ...restProps
    });

    if (!content) {
      console.warn(
        `Icon ${name}  not found from iconset ${componentName}.`
      );
      return null;
    }
    const otherProps: any = {};

    return (
      <BaseIconComponent
        ref={ref}
        {...options}
        {...otherProps}
        {...restProps}
        resolveType={ResolveType.Content}
        content={content}
      />
    );
  };

  Iconset.displayName = displayName;

  return React.forwardRef(Iconset);
}
