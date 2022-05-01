import { createElement, memo } from 'react'
import { ResolveType } from '../common/constants'
import type { CreateIconFactoryReturnType, IconContentBaseProps, IconSVG } from '../common/types'
import { NativeIcon } from './NativeIcon'
import type { NativeIconBaseComponentType, NativeIconRefType } from './types'

/**
 * Create renderable icon by content
 * @param {IconSVG} content;
 * @returns {React.ComponentType<IconBaseProps>}
 */
export const createNativeIcon: CreateIconFactoryReturnType<IconContentBaseProps, NativeIconRefType> = (content: IconSVG) => {
  return memo((props: NativeIconBaseComponentType<string, string>) => {
    return createElement(NativeIcon, {
      resolveType: ResolveType.Content,
      content,
      ...props,
    })
  })
}
