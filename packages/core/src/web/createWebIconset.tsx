import { createIconsetFactory } from '../common/createIconsetFactory'
import type { CreateIconsetOptions, IconsetComponentType } from '../common/types'
import type { WebIconBaseProps, WebIconRefType } from './types'
import { WebIcon } from './WebIcon'

export function createWebIconset<IconNames extends string, IconVariant extends string>(
  options: CreateIconsetOptions<IconNames, IconVariant>,
): IconsetComponentType<IconNames, IconVariant, WebIconBaseProps, WebIconRefType> {
  return createIconsetFactory<IconNames, IconVariant, WebIconBaseProps, WebIconRefType>(options, WebIcon)
}
