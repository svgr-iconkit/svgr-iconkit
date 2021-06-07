import { CreateIconsetOptions } from "./types";
import { createIconsetFactory } from "./createIconsetFactory";
import { createWebIcon } from "./createWebIcon";

export * from "./types";
export * from "./createIconsetFactory";
export { default as createIconComponent } from "./createWebIcon";

export function createIconset<IconNames extends string = string> (options: CreateIconsetOptions<IconNames>) {
  return createIconsetFactory(options, createWebIcon);
}
