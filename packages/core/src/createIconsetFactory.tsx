import React from "react";
import {
  IconsetBaseProps,
  CreateIconsetOptions,
  IconProps,
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
  BaseIconComponent: React.ComponentType<IconProps<IconNames, IconVariant>>
) {
  const _map: any = map;
  const _variants: string[] = variants || [];
  const _defaultVariant: string = defaultVariant || DEFAULT_VARIANT;

  const Iconset = (
    props: IconsetBaseProps<IconNames, IconVariant>,
    ref: any
  ) => {
    const {
      name,
      variant = _defaultVariant,
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

    return <BaseIconComponent ref={ref} content={iconComponentConfig} {...otherProps} {...restProps} />;
  };
  Iconset.displayName = `Iconset(${familyName})`;

  return React.forwardRef(Iconset);
}
