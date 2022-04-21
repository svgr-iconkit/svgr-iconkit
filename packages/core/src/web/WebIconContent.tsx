import { createElement } from 'react'
import { ForwardedRef, forwardRef, memo, useMemo } from 'react'
import { getContentFromIconProps, showDebugWarning } from '../common/utils'
import { IconProps } from '../common/types'
import { renderChildren } from './utils'
import { WebIconForwaredRefType } from './WebIcon'

export type WebIconContentForwaredRefType = SVGElement
/**
 * Render svg data within in <symbol>
 */
export const WebIconContent = memo(
  forwardRef(
    <IconNames extends string, IconVariant extends string>(
      props: IconProps<IconNames, IconVariant> & { as?: string },
      svgRef: ForwardedRef<WebIconForwaredRefType>,
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

      return createElement(as, {
        ref: svgRef,
        viewBox: attrs.viewBox,
        children: elements,
        ...restProps,
      })
    },
  ),
)
