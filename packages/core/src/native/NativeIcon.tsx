import { createElement, memo, useMemo } from 'react'
import type { TextStyle } from 'react-native'
import { Svg } from 'react-native-svg'
import type { IconComponentCoreProps } from '../common/types'
import {
  createRandomId,
  filterNonEmptyString,
  getContentFromIconProps,
  getViewboxValue,
  PRIMARY_CURRENT_COLOR,
  removeUnit,
  showDebugWarning,
} from '../common/utils'
import type { NativeIconBaseProps, NativeIconRefType } from './types'
import { convertProps, renderChildren } from './utils'

const InternalNativeIcon = function <IconNames extends string, IconVariant extends string>(
  props: IconComponentCoreProps<IconNames, IconVariant, NativeIconBaseProps, NativeIconRefType>,
) {
  const {
    ref: svgRef,
    name,
    variant,
    variantsMap,
    defaultVariant,
    resolveType,
    content,
    map,
    familyName,
    size,
    color,
    colorize = true,
    fontSize,
    lineHeight,
    children,
    style: propsStyle,
    debug,
    ...restProps
  } = props
  const svgContent = getContentFromIconProps({
    variantsMap,
    defaultVariant,
    resolveType,
    content,
    map,
    name,
    variant,
    familyName,
  })
  const elmNs = useMemo(() => `sik-${createRandomId()}`, [])
  const { attrs: svgAttrs, data: svgData = [] } = svgContent || {}
  const elements = useMemo(() => renderChildren(svgData, '#', `@${elmNs}:`), [svgData, elmNs])
  if (debug) {
    console.debug(`Icon render. id='%s', name='${name}', variant='${variant}', props=%o`, props.id, props)
  }
  if (!svgContent) {
    if (debug) {
      if (variant && name) {
        showDebugWarning(`Icon was not found by given name '${name}' and variant '${variant}'`)
      } else if (name) {
        showDebugWarning(`Icon was not found by given name '${name}'`)
      }
    }
    return null
  }

  const { fill, stroke, width: svgWidth, height: svgHeight, ...restAttrs } = svgAttrs || {}
  const viewBox = getViewboxValue(svgContent)

  const iconProps = convertProps(restProps, {}, { allowNonWhitelistProp: true })
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

  const style = propsStyle || null
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

  return createElement(
    Svg,
    {
      ref: svgRef,
      ...internalProps,
    },
    elements,
    children,
  )
}
InternalNativeIcon.displayName = 'NativeIcon'
export const NativeIcon = memo(InternalNativeIcon)
