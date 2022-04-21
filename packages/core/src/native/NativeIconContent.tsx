import { ComponentClass, memo, forwardRef, ForwardedRef, useMemo, createElement } from 'react'
import { Symbol } from 'react-native-svg'
import { getContentFromIconProps, showDebugWarning } from '../common/utils'
import { IconProps } from '../common/types'
import { NativeIconForwaredRefType } from './NativeIcon'
import { NodeComponentMap, renderChildren } from './utils'

export type NativeIconContentForwaredRefType = ComponentClass<unknown>

/**
 * Render svg data within in ```react-native-svg``` Symbol component
 */
export const NativeIconContent = memo(
  forwardRef(
    <IconNames extends string, IconVariant extends string>(
      props: IconProps<IconNames, IconVariant> & { as?: keyof typeof NodeComponentMap },
      svgRef: ForwardedRef<NativeIconForwaredRefType>,
    ) => {
      const { name, as = 'symbol', variant, className, ...restProps } = props
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
      const NodeComponent = NodeComponentMap[as] || (Symbol as any)

      return createElement(NodeComponent, {
        ref: svgRef,
        viewBox: attrs.viewBox,
        children: elements,
        ...restProps,
      })
    },
  ),
)
