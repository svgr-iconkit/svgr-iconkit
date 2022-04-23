import { createIconsetFactory } from '../common/createIconsetFactory'
import type { CreateIconsetFactoryResponseType, CreateIconsetOptions } from '../common/types'
import type { WebIconForwaredRefType } from './WebIcon'
import { WebIcon } from './WebIcon'

export function createWebIconset<IconNames extends string, IconVariant extends string>(
  options: CreateIconsetOptions<IconNames, IconVariant>,
): CreateIconsetFactoryResponseType<IconNames, IconVariant, WebIconForwaredRefType> {
  return createIconsetFactory<IconNames, IconVariant, WebIconForwaredRefType>(options, WebIcon)
}
