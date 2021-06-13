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


    const { name, variant = _defaultVariant, size = 24, color = '#000', ...restProps } = props;
    const iconComponentConfig =
      _variants.length > 0 && _map[variant] ? _map[variant][name] : _map[name];
    if (!iconComponentConfig) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `Icon ${name} (${variant}) not found from iconset ${familyName}.`
        );
      }
      return null;
    }
    const otherProps: any = {};
    if ( size ) {
      otherProps.width = size;
      otherProps.height = size;
    }
    if (color) {
      otherProps.fill = color;
    }

    const displayName = `${name}.${variant}`;
    // Getting icon component by given props change
    let IconComponent: React.ForwardRefExoticComponent<any> = _cache.get(displayName);

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
