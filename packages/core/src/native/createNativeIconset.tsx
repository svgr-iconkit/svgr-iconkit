import { createIconsetFactory } from '../common/createIconsetFactory'
import { CreateIconsetOptions } from '../common/types'
import { NativeIcon, NativeIconForwaredRefType } from './NativeIcon'

export function createNativeIconset<IconNames extends string, IconVariant extends string>(
  options: CreateIconsetOptions<IconNames, IconVariant>,
) {
  return createIconsetFactory<IconNames, IconVariant, NativeIconForwaredRefType>(options, NativeIcon)
}
