import { CreateIconsetOptions } from "./types";
import { createIconsetFactory } from "./createIconsetFactory";
import { createNativeIcon, NativeIcon } from "./createNativeIcon";

export * from "./types";
export * from "./createIconsetFactory";

export function createIconset<
  IconNames extends string = string,
  IconVariant extends string = string
>(options: CreateIconsetOptions<IconNames, IconVariant>) {
  return createIconsetFactory(options, NativeIcon);
}

export const createIconComponent = createNativeIcon;
export const Icon = NativeIcon;
