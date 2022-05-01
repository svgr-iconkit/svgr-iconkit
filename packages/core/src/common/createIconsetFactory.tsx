import { createElement } from 'react'
import { ResolveType } from './constants'
import type { CreateIconsetOptions, IconsetComponentCoreType } from './types'
import { getContentFromIconProps } from './utils'

export function createIconsetFactory<
  IconNames extends string,
  IconVariant extends string,
  ElementProps = {},
  ElementRefType = {},
>(
  options: CreateIconsetOptions<IconNames, IconVariant>,
  BaseIconComponent: IconsetComponentCoreType<IconNames, IconVariant, ElementProps, ElementRefType>,
): IconsetComponentCoreType<IconNames, IconVariant, ElementProps, ElementRefType> {
  const { familyName, resolveType = ResolveType.VariantMap, defaultVariant, variant = defaultVariant } = options

  let componentName = `${familyName}`
  if (resolveType === ResolveType.ContentMap) {
    componentName = `${familyName}-${variant}`
  }

  let displayName = `IconsetFamily(${componentName})`
  if (resolveType === ResolveType.ContentMap) {
    displayName = `IconsetVariant(${componentName})`
  }

  const Iconset: IconsetComponentCoreType<IconNames, IconVariant, ElementProps, ElementRefType> = (props) => {
    const { ref, name, ...restProps } = props // select target variant or assume there is no varaint from iconsmap data

    const content = getContentFromIconProps({
      name,
      map: props.map,
      resolveType: props.resolveType,
      variant: props.variant,
      variantsMap: props.variantsMap,
      defaultVariant: props.defaultVariant,
      content: props.content,
      ...options,
    })

    if (!content) {
      console.warn(`Icon '${name}' not found from iconset ${componentName}.`)
      return null
    }
    const otherProps: any = {}

    return createElement(BaseIconComponent, {
      ref,
      ...options,
      ...otherProps,
      ...restProps,
      resolveType: ResolveType.Content,
      content,
    })
  }

  Iconset.displayName = displayName

  return Iconset
}
