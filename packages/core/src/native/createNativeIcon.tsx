import { createElement, memo } from 'react'
import { ResolveType } from '../common/constants'
import type { CreateIconFactoryType, IconComponentCoreProps, IconContentBaseProps, IconSVG } from '../common/types'
import { NativeIcon } from './NativeIcon'
import type { NativeIconRefType } from './types'

/**
 * Create renderable icon by content
 * @param {IconSVG} content;
 * @returns {React.ComponentType<IconBaseProps>}
 */
export const createNativeIcon: CreateIconFactoryType<IconContentBaseProps, NativeIconRefType> = (content: IconSVG) => {
  return memo((props: IconComponentCoreProps<string, string, IconContentBaseProps, NativeIconRefType>) => {
    return createElement(NativeIcon, {
      resolveType: ResolveType.Content,
      content,
      ...props,
    })
  })
}
