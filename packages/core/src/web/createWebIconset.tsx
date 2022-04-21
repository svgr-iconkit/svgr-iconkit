import { createIconsetFactory } from '../common/createIconsetFactory'
import { CreateIconsetOptions } from '../common/types'
import { WebIcon, WebIconForwaredRefType } from './WebIcon'

export function createWebIconset<IconNames extends string, IconVariant extends string>(
  options: CreateIconsetOptions<IconNames, IconVariant>,
) {
  return createIconsetFactory<IconNames, IconVariant, WebIconForwaredRefType>(options, WebIcon)
}
