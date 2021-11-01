import {
  CreateFamilyOptions,
  CreateIconsetOptions,
  CreateVariantsMapOptions,
  ResolveType,
} from "./types";
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

export function createFamily<
  IconNames extends string = string,
  IconVariant extends string = string
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
  IconNames extends string = string,
  IconVariant extends string = string
>(options: CreateVariantsMapOptions<IconNames, IconVariant>) {
  const { familyName, variantsMap, variantNames = [] } = options;
  return variantNames.reduce((output, variantName) => {
    const variantIconsMap = createIconset<IconNames, IconVariant>({
      resolveType: ResolveType.ContentMap,
      familyName,
      map: variantsMap[variantName],
      variant: variantName,
    });
    return { ...output, [variantName]: variantIconsMap };
  }, {});
}

export const createIconComponent = createNativeIcon;
export const Icon = NativeIcon;
