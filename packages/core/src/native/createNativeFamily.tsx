import { ResolveType } from '../common/constants'
import type { CreateFamilyOptions, CreateIconsetFactoryResponseType } from '../common/types'
import { createNativeIconset } from './createNativeIconset'
import type { NativeIconForwaredRefType } from './NativeIcon'

export function createNativeFamily<IconNames extends string, IconVariant extends string>(
  options: CreateFamilyOptions<IconNames, IconVariant>,
): CreateIconsetFactoryResponseType<IconNames, IconVariant, NativeIconForwaredRefType> {
  const { familyName, variantsMap, ...rest } = options
  return createNativeIconset<IconNames, IconVariant>({
    resolveType: ResolveType.VariantMap,
    familyName,
    variantsMap,
    ...rest,
  })
}
