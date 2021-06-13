import { CreateIconsetOptions } from "./types";
import { createIconsetFactory } from "./createIconsetFactory";
import { createNativeIcon } from "./createNativeIcon";

export * from "./types";
export * from "./createIconsetFactory";
export { default as createIconComponent } from "./createNativeIcon";

export function createIconset<
  IconNames extends string = string,
  IconVariant extends string = string
>(options: CreateIconsetOptions<IconNames, IconVariant>) {
  return createIconsetFactory(options, createNativeIcon);
}
