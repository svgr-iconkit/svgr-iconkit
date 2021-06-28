import { CreateIconsetOptions } from "./types";
import { createIconsetFactory } from "./createIconsetFactory";
import { createWebIcon, WebIcon } from "./createWebIcon";

export * from "./types";
export * from "./createIconsetFactory";

export function createIconset<
  IconNames extends string = string,
  IconVariant extends string = string
>(options: CreateIconsetOptions<IconNames, IconVariant>) {
  return createIconsetFactory(options, WebIcon);
}

export const createIconComponent = createWebIcon;
export const Icon = WebIcon;
