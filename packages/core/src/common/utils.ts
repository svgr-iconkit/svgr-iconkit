import { camelCase } from 'camel-case'
import { ResolveType } from './constants'
import type { IconCoreProps, IconSVG } from './types'

const numberStartedRegExp = /^[0-9]/
const numberOnlyRegExp = /^[0-9]$/

export const PRIMARY_CURRENT_COLOR = 'currentColor'

export const createRandomId = (base = 0x100000) => ((1 + Math.random()) * base|0).toString(24)

const ignoredPropNames = ['title', 'version', 'style', 'content']

export const filterNonNumberStartedString = (str: any) => !String(str).match(numberStartedRegExp)
export const filterNubmerOnlyString = (str: any) => !!String(str).match(numberOnlyRegExp)
export const filterNonNubmerOnlyString = (str: any) => !!!String(str).match(numberOnlyRegExp)
export const filterIgnoredPropNames = (name: any) => !ignoredPropNames.includes(name)
export const filterNonEmptyString = (name: any) => name !== '' && name !== null && name !== undefined

export const DEFAULT_VARIANT = 'regular'

export const removeUnit = (str?: string | number, unit: string = 'px') => (!str ? '' : String(str).replace(unit, ''))

export const appendUnit = (str?: string | number, unit: string = 'px') => {
  if (filterNubmerOnlyString(str)) return `${str}${unit}`
  return String(str)
}

export const propNameFiltering = (name: string) =>
  filterNonNumberStartedString(name) && filterNonEmptyString(name) && filterIgnoredPropNames(name)

/**
 * Used for create the runner for converting react used props
 * @param namesRemap {Record<string, string | null>} Swap the original name into new props name or remove it when mattched
 * @param attrs
 * @param originalContent
 * @returns
 */
export const createConvertReactProps =
  (namesRemap?: Record<string, string | null>, {convertCamelCase = true} = {}) =>
  (attrs: Record<string, any>, originalContent: any = {}, {  allowNonWhitelistProp = true } = {}) => {
    const exportedProps: any = {
      ...originalContent,
    }

    return Object.keys(attrs)
      .filter(propNameFiltering)
      .reduce((curProps, sourceName: string) => {
        let targetName = !namesRemap ? sourceName : namesRemap[sourceName]
        if (!targetName && allowNonWhitelistProp) targetName = sourceName
        if (targetName) {
          const convertedName = convertCamelCase ? camelCase(targetName) : targetName
          curProps[convertedName] = attrs[targetName] || attrs[sourceName]
        }
        return curProps
      }, exportedProps)
  }

/**
 * Getting viewBox string from properties, default width height is 24
 * @param {IconSVG} content SVG Content
 * @returns {string}
 */
export const getViewboxValue = (content: IconSVG): string => {
  const { attrs, width = 24, height = 24 } = content
  const { viewBox, width: orgWidth, height: orgHeight } = attrs || {}
  const _viewBox = viewBox || `0 0 ${removeUnit(orgWidth || width)} ${removeUnit(orgHeight || height)}`
  return _viewBox
}

export const getContentFromIconProps = <IconNames extends string, IconVariant extends string>(
  props: IconCoreProps<IconNames, IconVariant>,
) => {
  const { content, name, resolveType: type } = props
  if (content && (type === ResolveType.Content || !type)) {
    return content
  }
  const map = resolveIconsMap(props)
  if (name && map && map[name]) {
    return map[name]
  }
  return null
}

export const resolveIconsMap = <IconNames extends string, IconVariant extends string = string>(
  props: IconCoreProps<IconNames, IconVariant>,
) => {
  const { resolveType: type, variantsMap, map, variant, defaultVariant } = props
  if (type === ResolveType.VariantMap) {
    if (variantsMap && variant && variantsMap[variant]) {
      return variantsMap[variant]
    }
    if (variantsMap && defaultVariant && variantsMap[defaultVariant] && variantsMap[defaultVariant]) {
      return variantsMap[defaultVariant]
    }
  }
  if (type === ResolveType.ContentMap) {
    if (variantsMap && variant && variantsMap[variant] && variantsMap[variant]) {
      return variantsMap[variant]
    }
    if (map) {
      return map
    }
  }
  return null
}

export function showDebugWarning(...rest: any[]) {
  // if (process.env.NODE_ENV !== "development") {
  //   return null;
  // }
  console.warn.apply(console, rest)
}
