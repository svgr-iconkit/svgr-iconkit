import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { CreateIconFactoryType, IconContentBaseProps, IconSVG } from '../common/types'
import { ResolveType } from '../common/constants'
import { WebIcon, WebIconForwaredRefType } from './WebIcon'

/**
 * Create renderable icon by content
 * @param {IconSVG} content;
 * @returns {React.ComponentType<IconBaseProps>}
 */
export const createWebIcon: CreateIconFactoryType<WebIconForwaredRefType, IconContentBaseProps> = (
  content: IconSVG,
) => {
  function WebIconWrapper(props: IconContentBaseProps, svgRef: Ref<WebIconForwaredRefType>) {
    return <WebIcon resolveType={ResolveType.Content} ref={svgRef} content={content} {...props} />
  }
  return forwardRef(WebIconWrapper)
}
