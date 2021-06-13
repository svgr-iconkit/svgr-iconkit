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
  const Iconset = (
    props: IconsetBaseProps<IconNames, IconVariant>,
    ref: any
  ) => {
    const { name, variant = _defaultVariant, ...restProps } = props;
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
    const IconComponent: React.ForwardRefExoticComponent<any> =
      React.useMemo(() => {
        const Comp = factory(iconComponentConfig);
        Comp.displayName = `${familyName}.${name}.${variant}`;
        return Comp;
      }, [familyName, name, variant, iconComponentConfig]);
    return <IconComponent ref={ref} {...restProps} />;
  };
  Iconset.displayName = familyName;

  return React.forwardRef(Iconset);
}
