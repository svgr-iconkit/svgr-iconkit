import { ResolveType } from '../common/constants'
import type { CreateVariantsMapOptions } from '../common/types'
import { createNativeIconset } from './createNativeIconset'
import type { NativeIconRefType } from './types'

export function createNativeVariantsMap<IconNames extends string, IconVariant extends string>(
  options: CreateVariantsMapOptions<IconNames, IconVariant>,
): Record<IconVariant, Record<IconNames, NativeIconRefType>> {
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
