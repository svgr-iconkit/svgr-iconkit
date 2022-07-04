import { createElement, memo } from 'react'
import { ResolveType } from '../common/constants'
import type { CreateIconFactoryReturnType, IconSVG } from '../common/types'
import type { WebIconBaseComponentType, WebIconBaseProps, WebIconRefType } from './types'
import { WebIcon } from './WebIcon'

/**
 * Create renderable icon by content
 * @param {IconSVG} content;
 * @returns {React.ComponentType<IconBaseProps>}
 */
export const createWebIcon: CreateIconFactoryReturnType<WebIconBaseProps, WebIconRefType> = (content: IconSVG) => {
  return memo((props: WebIconBaseComponentType<string, string>) => {
    return createElement(WebIcon, {
      resolveType: ResolveType.Content,
      content,
      ...props,
    })
  })
}
