import { CreateFamilyOptions, ResolveType } from '../common/types'
import { createWebIconset } from './createWebIconset'

export function createWebFamily<IconNames extends string, IconVariant extends string>(
  options: CreateFamilyOptions<IconNames, IconVariant>,
) {
  const { familyName, variantsMap, ...rest } = options
  return createWebIconset<IconNames, IconVariant>({
    resolveType: ResolveType.VariantMap,
    familyName,
    variantsMap,
    ...rest,
  })
}
