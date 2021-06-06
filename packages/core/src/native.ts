import { CreateIconsetOptions } from "./types";
import { createIconsetFactory } from "./createIconsetFactory";
import { createNativeIcon } from "./createNativeIcon";

export * from "./types";
export * from "./createIconsetFactory";
export * from "./createIconmap";
export { default as createIconComponent } from "./createNativeIcon";

export function createIconset<IconNames extends string = string> (options: CreateIconsetOptions<IconNames>) {
  return createIconsetFactory(options, createNativeIcon);
}
