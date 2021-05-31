import React from "react";
import { IconsetBaseProps, CreateIconsetOptions } from "./types";

export function createIconset<IconNames extends string>({
  familyName,
  map,
}: CreateIconsetOptions<IconNames>) {
  const Iconset = (props: IconsetBaseProps<IconNames>, ref: any) => {
    const { name, ...restProps } = props;
    const Instance = map[name];
    Instance.displayName = `${familyName}.${name}`;
    if (!Instance) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Icon %s not found from iconset %s.", name, familyName);
      }
      return null;
    }
    return <Instance ref={ref} {...restProps} />;
  };
  Iconset.displayName = familyName;

  return React.forwardRef(Iconset);
}
