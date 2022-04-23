import type { CreateFamilyOptions, CreateIconsetFactoryResponseType } from '../common/types'
import { ResolveType } from '../common/constants'
import { createWebIconset } from './createWebIconset'
import type { WebIconForwaredRefType } from './WebIcon'

export function createWebFamily<IconNames extends string, IconVariant extends string>(
  options: CreateFamilyOptions<IconNames, IconVariant>,
): CreateIconsetFactoryResponseType<IconNames, IconVariant, WebIconForwaredRefType> {
  const { familyName, variantsMap, ...rest } = options
  return createWebIconset<IconNames, IconVariant>({
    resolveType: ResolveType.VariantMap,
    familyName,
    variantsMap,
    ...rest,
  })
}
