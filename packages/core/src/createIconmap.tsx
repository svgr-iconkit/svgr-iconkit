import { IconComponentClass, IconsetProps, IconsetSVGNode } from "./types";

export function createIconmap<IconNames extends string = string>(
  createIcon: Function,
  icons: IconsetSVGNode[]
) {
  const map: Record<string, IconComponentClass<IconNames>> = {};

  icons.forEach((icon) => {
    const comp: IconComponentClass<IconNames> = createIcon(icons);
    map[icon.name] = comp;
  });
  return map;
}
