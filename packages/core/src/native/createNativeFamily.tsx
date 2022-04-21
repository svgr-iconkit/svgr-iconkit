import { CreateFamilyOptions, ResolveType } from '../common/types'
import { createNativeIconset } from './createNativeIconset'

export function createNativeFamily<IconNames extends string, IconVariant extends string>(
  options: CreateFamilyOptions<IconNames, IconVariant>,
) {
  const { familyName, variantsMap, ...rest } = options
  return createNativeIconset<IconNames, IconVariant>({
    resolveType: ResolveType.VariantMap,
    familyName,
    variantsMap,
    ...rest,
  })
}
