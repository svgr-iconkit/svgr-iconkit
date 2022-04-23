import { createElement, forwardRef, useMemo, memo } from 'react'
import type { Component, ForwardedRef } from 'react'
import type { ViewStyle, TextStyle } from 'react-native'
import type { SvgProps } from 'react-native-svg'
import { Svg } from 'react-native-svg'
import {
  getContentFromIconProps,
  showDebugWarning,
  getViewboxValue,
  PRIMARY_CURRENT_COLOR,
  filterNonEmptyString,
  removeUnit,
} from '../common/utils'
import type { IconProps } from '../common/types'
import { convertProps, renderChildren } from './utils'

export type NativeIconForwaredRefType = Component<SvgProps>

const InternalNativeIcon = forwardRef(function <IconNames extends string, IconVariant extends string>(
  props: IconProps<IconNames, IconVariant>,
  svgRef: ForwardedRef<NativeIconForwaredRefType>,
) {
  const { name, variant, size, color, colorize = true, fontSize, lineHeight, style: propsStyle, ...restProps } = props
  const svgContent = getContentFromIconProps(props)
  const { attrs: svgAttrs, data: svgData = [] } = svgContent || {}
  const elements = useMemo(() => renderChildren(svgData), [svgData])
  if (!svgContent) {
    if (variant && name) {
      showDebugWarning(`Icon was not found by given name '${name}' and variant '${variant}'`)
    } else if (name) {
      showDebugWarning(`Icon was not found by given name '${name}'`)
    }
    return null
  }

  const { fill, stroke, width: svgWidth, height: svgHeight, ...restAttrs } = svgAttrs || {}
  const viewBox = getViewboxValue(svgContent)

  const iconProps = convertProps(restProps, {}, { allowNonWhitelistProp: false })
  const attrProps = convertProps(restAttrs, {}, { allowNonWhitelistProp: false })
  const internalProps = {
    fill,
    stroke,
    ...attrProps,
    viewBox,
    ...iconProps,
  }

  if (fill !== 'none' && colorize) {
    internalProps.fill = PRIMARY_CURRENT_COLOR
  }

  const style: ViewStyle = propsStyle || {}
  const internalStyle: TextStyle = {}
  if (color && colorize) {
    // For some iconset, they use stroke to styling and cannot use fill properties
    internalStyle.color = color
  }
  if (filterNonEmptyString(svgWidth)) {
    internalStyle.width = svgWidth
  }
  if (filterNonEmptyString(svgHeight)) {
    internalStyle.height = svgHeight
  }
  if (size) {
    internalStyle.width = removeUnit(size)
    internalStyle.height = removeUnit(size)
  }
  if (fontSize) {
    internalStyle.width = removeUnit(fontSize)
    internalStyle.height = removeUnit(fontSize)
    internalStyle.fontSize = Number(removeUnit(fontSize))
  }
  if (lineHeight) {
    internalStyle.lineHeight = Number(removeUnit(lineHeight))
  }
  internalProps.style = [internalStyle, style]

  return createElement(Svg, {
    ref: svgRef,
    children: elements,
    ...internalProps,
  })
})
InternalNativeIcon.displayName = 'NativeIcon'
export const NativeIcon = memo(InternalNativeIcon)
