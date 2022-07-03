import type { ForwardedRef } from 'react'
import { createElement, forwardRef, memo, useMemo } from 'react'
import type { IconComponentCoreProps } from '../common/types'
import { createRandomId, getContentFromIconProps, showDebugWarning } from '../common/utils'
import type { WebIconContentBaseProps, WebIconContentRefType } from './types'
import { renderChildren } from './utils'
/**
 * Render svg data within in <symbol>
 */
export const WebIconContent =
  forwardRef(
    <IconNames extends string, IconVariant extends string>(
      props: IconComponentCoreProps<IconNames, IconVariant> & { as?: string } & WebIconContentBaseProps,
      svgRef: ForwardedRef<WebIconContentRefType>,
    ) => {
      const {
        variantsMap,
        defaultVariant,
        resolveType,
        content,
        map,
        familyName,
        name,
        as = 'symbol',
        variant,
        children,
        ...restProps
      } = props
      const elmNs = useMemo(() => `sik-${createRandomId()}`, [])
      const svgContent = getContentFromIconProps({
        variantsMap,
        defaultVariant,
        resolveType,
        content,
        map,
        familyName,
        name,
        variant,
      })
      const { attrs = {}, data: svgData = [] } = svgContent || {}
      const elements = useMemo(() => renderChildren(svgData, '#', `@${elmNs}:`), [svgData])
      if (!svgContent) {
        if (variant && name) {
          showDebugWarning(`IconContent was not found by given name '${name}' and variant '${variant}'`)
        } else if (name) {
          showDebugWarning(`IconContent was not found by given name '${name}'`)
        }
        return null
      }

      return createElement(
        as,
        {
          ref: svgRef,
          viewBox: attrs.viewBox,
          ...restProps,
        },
        elements,
        children,
      )
    },
  )

