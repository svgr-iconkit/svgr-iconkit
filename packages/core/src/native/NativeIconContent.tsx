import type { ForwardedRef } from 'react'
import { createElement, forwardRef, memo, useMemo } from 'react'
import { Symbol } from 'react-native-svg'
import type { IconComponentCoreProps } from '../common/types'
import { getContentFromIconProps, showDebugWarning } from '../common/utils'
import type { NativeIconContentBaseProps, NativeIconContentRefType } from './types'
import { nodeComponentMap, renderChildren } from './utils'

/**
 * Render svg data within in ```react-native-svg``` Symbol component
 */
export const NativeIconContent = memo(
  forwardRef(
    <IconNames extends string, IconVariant extends string>(
      props: IconComponentCoreProps<IconNames, IconVariant> & {
        as?: keyof typeof nodeComponentMap
      } & NativeIconContentBaseProps,
      svgRef: ForwardedRef<NativeIconContentRefType>,
    ) => {
      const { name, as = 'symbol', variant, children, ...restProps } = props
      const svgContent = getContentFromIconProps(props)
      const { attrs = {}, data: svgData = [] } = svgContent || {}
      const elements = useMemo(() => renderChildren(svgData), [svgData])
      if (!svgContent) {
        if (variant && name) {
          showDebugWarning(`IconContent was not found by given name '${name}' and variant '${variant}'`)
        } else if (name) {
          showDebugWarning(`IconContent was not found by given name '${name}'`)
        }
        return null
      }
      const NodeComponent = nodeComponentMap[as] || (Symbol as any)

      return createElement(
        NodeComponent,
        {
          ref: svgRef,
          viewBox: attrs.viewBox,
          ...restProps,
        },
        elements,
        children,
      )
    },
  ),
)
