import { createElement, memo } from 'react'
import { ResolveType } from '../common/constants'
import type { CreateIconFactoryType, IconComponentCoreProps, IconSVG } from '../common/types'
import type { WebIconBaseProps, WebIconRefType } from './types'
import { WebIcon } from './WebIcon'

/**
 * Create renderable icon by content
 * @param {IconSVG} content;
 * @returns {React.ComponentType<IconBaseProps>}
 */
export const createWebIcon: CreateIconFactoryType<WebIconBaseProps, WebIconRefType> = (content: IconSVG) => {
  return memo((props: IconComponentCoreProps<string, string, WebIconBaseProps, WebIconRefType>) => {
    return createElement(WebIcon, {
      resolveType: ResolveType.Content,
      content,
      ...props,
    })
  })
}
