import { createIconsetFactory } from '../common/createIconsetFactory'
import type { CreateIconsetOptions, IconsetComponentType } from '../common/types'
import { NativeIcon } from './NativeIcon'
import type { NativeIconBaseProps, NativeIconRefType } from './types'

export function createNativeIconset<IconNames extends string, IconVariant extends string>(
  options: CreateIconsetOptions<IconNames, IconVariant>,
): IconsetComponentType<IconNames, IconVariant, NativeIconBaseProps, NativeIconRefType> {
  return createIconsetFactory<IconNames, IconVariant, NativeIconBaseProps, NativeIconRefType>(options, NativeIcon)
}
