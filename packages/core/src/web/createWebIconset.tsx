import { createIconsetFactory } from '../common/createIconsetFactory'
import type { CreateIconsetOptions } from '../common/types'
import type { WebIconBaseProps, WebIconRefType, WebIconsetBaseComponentType } from './types'
import { WebIcon } from './WebIcon'

export function createWebIconset<IconNames extends string, IconVariant extends string>(
  options: CreateIconsetOptions<IconNames, IconVariant>,
): WebIconsetBaseComponentType<IconNames, IconVariant> {
  return createIconsetFactory<IconNames, IconVariant, WebIconBaseProps, WebIconRefType>(options, WebIcon)
}
