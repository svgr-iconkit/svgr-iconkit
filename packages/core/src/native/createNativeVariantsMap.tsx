import { ResolveType } from '../common/constants'
import type { CreateVariantsMapOptions } from '../common/types'
import { createNativeIconset } from './createNativeIconset'
import type { NativeIconVariantsMapType } from './types'

export function createNativeVariantsMap<IconNames extends string, IconVariant extends string>(
  options: CreateVariantsMapOptions<IconNames, IconVariant>,
): NativeIconVariantsMapType<IconNames, IconVariant> {
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
  }, {} as NativeIconVariantsMapType<IconNames, IconVariant>)
}
