import { ResolveType } from '../common/constants'
import type { CreateFamilyOptions, IconsetComponentCoreType } from '../common/types'
import { createNativeIconset } from './createNativeIconset'
import type { NativeIconBaseProps, NativeIconRefType } from './types'

export function createNativeFamily<IconNames extends string, IconVariant extends string>(
  options: CreateFamilyOptions<IconNames, IconVariant>,
): IconsetComponentCoreType<IconNames, IconVariant, NativeIconBaseProps, NativeIconRefType> {
  const { familyName, variantsMap, ...rest } = options
  return createNativeIconset<IconNames, IconVariant>({
    resolveType: ResolveType.VariantMap,
    familyName,
    variantsMap,
    ...rest,
  })
}
