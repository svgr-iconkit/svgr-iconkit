import React from "react";
import {
  IconsetBaseProps,
  CreateIconsetOptions,
  CreateIconFactoryType,
} from "./types";

export function createIconsetFactory<IconNames extends string>(
  { familyName, map }: CreateIconsetOptions<IconNames>,
  factory: CreateIconFactoryType
) {
  const Iconset = (props: IconsetBaseProps<IconNames>, ref: any) => {
    const { name, ...restProps } = props;
    const iconComponentConfig = map[name];
    if (!iconComponentConfig) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`Icon ${name} not found from iconset ${familyName}.`);
      }
      return null;
    }
    const IconComponent: React.ForwardRefExoticComponent<any> = React.useMemo(
      () => {
        const Comp = factory(iconComponentConfig);
        Comp.displayName = `${familyName}.${name}`;
        return Comp;
      },
      [familyName, name, iconComponentConfig]
    );
    return <IconComponent ref={ref} {...restProps} />;
  };
  Iconset.displayName = familyName;

  return React.forwardRef(Iconset);
}
