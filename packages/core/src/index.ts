import { CreateIconsetOptions, IconSVG } from "./types";
import { createIconsetFactory } from "./createIconsetFactory";
import { createWebIcon, WebIcon } from "./createWebIcon";

export * from "./types";
export * from "./createIconsetFactory";
export { default as createIconComponent } from "./createWebIcon";

export function createIconset<
  IconNames extends string = string,
  IconVariant extends string = string
>(options: CreateIconsetOptions<IconNames, IconVariant>) {
  return createIconsetFactory(options, createWebIcon);
}

export const Icon = WebIcon;
