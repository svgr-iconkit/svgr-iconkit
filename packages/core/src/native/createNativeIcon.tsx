import React, { forwardRef, Ref } from 'react'
import type { CreateIconFactoryType, IconContentBaseProps, IconSVG } from '../common/types'
import { ResolveType } from '../common/types'
import { NativeIcon, NativeIconForwaredRefType } from './NativeIcon'

/**
 * Create renderable icon by content
 * @param {IconSVG} content;
 * @returns {React.ComponentType<IconBaseProps>}
 */
export const createNativeIcon: CreateIconFactoryType<NativeIconForwaredRefType, IconContentBaseProps> = (
  content: IconSVG,
) => {
  return forwardRef((props: IconContentBaseProps, svgRef: Ref<NativeIconForwaredRefType>) => {
    return <NativeIcon resolveType={ResolveType.Content} ref={svgRef} content={content} {...props} />
  })
}
