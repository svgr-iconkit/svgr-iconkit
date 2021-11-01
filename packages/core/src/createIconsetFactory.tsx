import React from "react";
import {
  ResolveType,
  IconsetBaseProps,
  CreateIconsetOptions,
  CreateIconsetFactoryResponseType,
  IconProps,
} from "./types";
import { resolveIconsMap } from "./utils";

export function createIconsetFactory<
  IconNames extends string = string,
  IconVariant extends string = string
>(
  options: CreateIconsetOptions<IconNames, IconVariant>,
  BaseIconComponent: React.ComponentType<IconProps<IconNames, IconVariant>>
): CreateIconsetFactoryResponseType<IconNames, IconVariant> {
  const {
    familyName,
    resolveType: type,
    colorize = false,
  } = options;

  const _resolveType = type || ResolveType.VariantMap;

  const Iconset = (
    props: IconsetBaseProps<IconNames, IconVariant>,
    ref: any
  ) => {
    const { name, ...restProps } = props; // select target variant or assume there is no varaint from iconsmap data
    const iconComponentConfig = resolveIconsMap({
      ...options,
      name,
    });

    if (!iconComponentConfig) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `Icon ${name} (${type}) not found from iconset ${familyName}.`
        );
      }
      return null;
    }
    const otherProps: any = {};

    return (
      <BaseIconComponent
        ref={ref}
        content={iconComponentConfig}
        colorize={colorize}
        {...otherProps}
        {...restProps}
      />
    );
  };

  Iconset.displayName = `IconsetFamily(${familyName})`;
  if (type === ResolveType.ContentMap) {
    Iconset.displayName = `IconsetVariant(${familyName}-${options.variant})`;
  }

  return React.forwardRef(Iconset);
}
