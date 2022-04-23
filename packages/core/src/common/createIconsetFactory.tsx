import React from 'react'
import type { ForwardedRef, ComponentType } from 'react'
import type { IconsetBaseProps, CreateIconsetOptions, CreateIconsetFactoryResponseType, IconProps } from './types'
import { ResolveType } from './constants'
import { getContentFromIconProps } from './utils'

export function createIconsetFactory<IconNames extends string, IconVariant extends string, ElementType = any>(
  options: CreateIconsetOptions<IconNames, IconVariant>,
  BaseIconComponent: ComponentType<IconProps<IconNames, IconVariant>>,
): CreateIconsetFactoryResponseType<IconNames, IconVariant, ElementType> {
  const { familyName, resolveType = ResolveType.VariantMap, defaultVariant, variant = defaultVariant } = options

  let componentName = `${familyName}`
  if (resolveType === ResolveType.ContentMap) {
    componentName = `${familyName}-${variant}`
  }

  let displayName = `IconsetFamily(${componentName})`
  if (resolveType === ResolveType.ContentMap) {
    displayName = `IconsetVariant(${componentName})`
  }

  const Iconset = (props: IconsetBaseProps<IconNames, IconVariant>, ref: ForwardedRef<ElementType>) => {
    const { name, ...restProps } = props // select target variant or assume there is no varaint from iconsmap data
    const content = getContentFromIconProps({
      ...options,
      name,
      ...restProps,
    })

    if (!content) {
      console.warn(`Icon ${name}  not found from iconset ${componentName}.`)
      return null
    }
    const otherProps: any = {}

    return (
      <BaseIconComponent
        ref={ref}
        {...options}
        {...otherProps}
        {...restProps}
        resolveType={ResolveType.Content}
        content={content}
      />
    )
  }

  Iconset.displayName = displayName

  return React.forwardRef(Iconset)
}
