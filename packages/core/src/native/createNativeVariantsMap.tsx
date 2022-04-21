import { CreateVariantsMapOptions, ResolveType } from '../common/types'
import { createNativeIconset } from './createNativeIconset'

export function createNativeVariantsMap<IconNames extends string, IconVariant extends string>(
  options: CreateVariantsMapOptions<IconNames, IconVariant>,
): Record<IconVariant, IconNames> {
  const { familyName, variantsMap, variantNames = [], ...rest } = options
  return variantNames.reduce((output, variantName) => {
    const variantIconsMap = createNativeIconset<IconNames, IconVariant>({
      resolveType: ResolveType.ContentMap,
      familyName,
      map: variantsMap[variantName],
      variant: variantName,
      ...rest,
    })
    return { ...output, [variantName]: variantIconsMap }
  }, {}) as any
}
