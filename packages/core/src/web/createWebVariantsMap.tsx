import type { CreateVariantsMapOptions } from '../common/types'
import { ResolveType } from '../common/constants'
import { createWebIconset } from './createWebIconset'
import type { ComponentType } from 'react'

export function createWebVariantsMap<IconNames extends string, IconVariant extends string>(
  options: CreateVariantsMapOptions<IconNames, IconVariant>,
): Record<IconVariant, Record<IconNames, ComponentType<SVGSVGElement>>> {
  const { familyName, variantsMap, variantNames = [], ...rest } = options
  return variantNames.reduce((output, variantName) => {
    const variantIconsMap = createWebIconset<IconNames, IconVariant>({
      resolveType: ResolveType.ContentMap,
      familyName,
      map: variantsMap[variantName],
      variant: variantName,
      ...rest,
    })
    return { ...output, [variantName]: variantIconsMap }
  }, {}) as any
}
