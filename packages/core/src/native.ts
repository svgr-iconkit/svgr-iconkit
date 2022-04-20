import type {
  CreateFamilyOptions,
  CreateIconsetOptions,
  CreateVariantsMapOptions,
} from "./types";
import {
  ResolveType,
} from "./types";
import { createIconsetFactory } from "./createIconsetFactory";
import { NativeIcon } from "./createNativeIcon";
import type { NativeIconForwaredRefType } from "./createNativeIcon"
export {
  createNativeIcon as createIconComponent,
  NativeIcon as Icon,
  NativeIconContent as IconContent,
} from "./createNativeIcon";

export * from "./types";
export * from "./createIconsetFactory";

export function createIconset<
  IconNames extends string,
  IconVariant extends string
>(options: CreateIconsetOptions<IconNames, IconVariant>) {
  return createIconsetFactory<
    IconNames,
    IconVariant,
    NativeIconForwaredRefType
  >(options, NativeIcon);
}

export function createFamily<
  IconNames extends string,
  IconVariant extends string
>(options: CreateFamilyOptions<IconNames, IconVariant>) {
  const { familyName, variantsMap, ...rest } = options;
  return createIconset<IconNames, IconVariant>({
    resolveType: ResolveType.VariantMap,
    familyName,
    variantsMap,
    ...rest,
  });
}

export function createVariantsMap<
  IconNames extends string,
  IconVariant extends string
>(
  options: CreateVariantsMapOptions<IconNames, IconVariant>
): Record<IconVariant, IconNames> {
  const { familyName, variantsMap, variantNames = [], ...rest } = options;
  return variantNames.reduce((output, variantName) => {
    const variantIconsMap = createIconset<IconNames, IconVariant>({
      resolveType: ResolveType.ContentMap,
      familyName,
      map: variantsMap[variantName],
      variant: variantName,
      ...rest,
    });
    return { ...output, [variantName]: variantIconsMap };
  }, {}) as any;
}
