import { createIconsetFactory } from '../common/createIconsetFactory'
import type { CreateIconsetOptions } from '../common/types'
import { NativeIcon } from './NativeIcon'
import type { NativeIconBaseProps, NativeIconRefType, NativeIconsetBaseComponentType } from './types'

export function createNativeIconset<IconNames extends string, IconVariant extends string>(
  options: CreateIconsetOptions<IconNames, IconVariant>,
): NativeIconsetBaseComponentType<IconNames, IconVariant> {
  return createIconsetFactory<IconNames, IconVariant, NativeIconBaseProps, NativeIconRefType>(options, NativeIcon)
}
