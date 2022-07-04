import { ResolveType } from '../common/constants'
import type { CreateVariantsMapOptions } from '../common/types'
import { createWebIconset } from './createWebIconset'
import type { WebIconVariantsMapType } from './types'

export function createWebVariantsMap<IconNames extends string, IconVariant extends string>(
  options: CreateVariantsMapOptions<IconNames, IconVariant>,
): WebIconVariantsMapType<IconNames, IconVariant> {
  const { familyName, variantsMap, variantNames = [], ...rest } = options
  return variantNames.reduce((output, variantName) => {
    const variantIconset = createWebIconset<IconNames, IconVariant>({
      resolveType: ResolveType.ContentMap,
      familyName,
      map: variantsMap[variantName],
      variant: variantName,
      ...rest,
    })
    return { ...output, [variantName]: variantIconset }
  }, {} as WebIconVariantsMapType<IconNames, IconVariant>)
}
