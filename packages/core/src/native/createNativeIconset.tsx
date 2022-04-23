import { createIconsetFactory } from '../common/createIconsetFactory'
import type { CreateIconsetFactoryResponseType, CreateIconsetOptions } from '../common/types'
import { NativeIcon, } from './NativeIcon'
import type { NativeIconForwaredRefType } from './NativeIcon'

export function createNativeIconset<IconNames extends string, IconVariant extends string>(
  options: CreateIconsetOptions<IconNames, IconVariant>,
): CreateIconsetFactoryResponseType<IconNames, IconVariant, NativeIconForwaredRefType> {
  return createIconsetFactory<IconNames, IconVariant, NativeIconForwaredRefType>(options, NativeIcon)
}
