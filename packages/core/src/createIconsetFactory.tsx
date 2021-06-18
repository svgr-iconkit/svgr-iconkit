import React from "react";
import {
  IconsetBaseProps,
  CreateIconsetOptions,
  CreateIconFactoryType,
} from "./types";

export const DEFAULT_VARIANT = "regular";

export function createIconsetFactory<
  IconNames extends string = string,
  IconVariant extends string = string
>(
  {
    familyName,
    map,
    variants,
    defaultVariant,
  }: CreateIconsetOptions<IconNames, IconVariant>,
  factory: CreateIconFactoryType
) {
  const _map: any = map;
  const _variants: string[] = variants || [];
  const _defaultVariant: string = defaultVariant || DEFAULT_VARIANT;

  const _cache = new Map<string, any>();

  const Iconset = (
    props: IconsetBaseProps<IconNames, IconVariant>,
    ref: any
  ) => {
    const {
      name,
      variant = _defaultVariant,
      size,
      style,
      color,
      ...restProps
    } = props;
    const iconComponentConfig =
      _variants.length > 0 && _map[variant]
      // select target variant or defaultVariant if not exist
        ? _map[variant][name] || _map[defaultVariant][name]
        : _map[name];
    if (!iconComponentConfig) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `Icon ${name} (${variant}) not found from iconset ${familyName}.`
        );
      }
      return null;
    }
    const otherProps: any = {};
    const internalStyle: any = {};
    if (size) {
      internalStyle.width = size;
      internalStyle.height = size;
    }
    if (
      !iconComponentConfig.attrs ||
      iconComponentConfig.attrs.fill !== "none"
    ) {
      otherProps.fill = "currentColor";
    }
    if (color) {
      // For some iconset, they use stroke to styling and cannot use fill properties
      if (
        !iconComponentConfig.attrs ||
        iconComponentConfig.attrs.fill !== "none"
      ) {
        otherProps.fill = color;
      }
      internalStyle.color = color;
    }
    otherProps.style = {
      ...internalStyle,
      ...(style || {}),
    };

    const displayName = `${name}.${variant}`;
    // Getting icon component by given props change
    let IconComponent: React.ForwardRefExoticComponent<any> =
      _cache.get(displayName);

    if (!IconComponent) {
      IconComponent = factory(iconComponentConfig);
      IconComponent.displayName = displayName;
    }

    if (!_cache.has(displayName)) {
      _cache.set(displayName, IconComponent);
    }

    return <IconComponent ref={ref} {...otherProps} {...restProps} />;
  };
  Iconset.displayName = familyName;

  return React.forwardRef(Iconset);
}
