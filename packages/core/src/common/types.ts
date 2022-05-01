import type { ComponentType, ForwardRefExoticComponent, ReactElement, RefAttributes } from 'react'
import { ResolveType } from './constants'

export type IconSVGNode = {
  tagName: string
  attrs?: Record<string, any>
  children?: IconSVGNode[]
}

export type IconSVG = {
  name: string
  width?: number
  height?: number
  attrs?: Record<string, any>
  data: IconSVGNode[]
}
/** Backward compitable */
/**
 * @deprecated Use IconSVGNode
 */
export type IconsetSVGNode = IconSVGNode

/**
 * @deprecated Use IconSVG
 */
export type IconsetSVG = IconSVG

export type IconsMapType<IconNames extends string = string> = Record<IconNames, IconSVG>

export type IconsetMap<IconNames extends string, IconVariant extends string> =
  | Record<IconVariant, IconsMapType<IconNames>>
  | { [key: string]: IconsMapType<IconNames | string> }

export interface IconContentBaseProps {
  width?: string | number
  height?: string | number
  size?: string | number
  lineHeight?: string | number
  fontSize?: string | number
  color?: string
}

export type IconCoreProps<IconNames extends string, IconVariant extends string> = {
  content?: IconSVG
  resolveType?: ResolveType
  name?: IconNames
  colorize?: boolean
  variantsMap?: IconsetMap<IconNames, IconVariant>
  map?: IconsMapType<IconNames>
  variant?: IconVariant
  defaultVariant?: IconVariant
  debug?: boolean
}

export type IconComponentCoreProps<
  IconNames extends string,
  IconVariant extends string,
  BaseProps = {},
  ElementRefType = {},
> = IconContentBaseProps & IconCoreProps<IconNames, IconVariant> & BaseProps & RefAttributes<ElementRefType>

export type IconsetCoreProps<
  IconNames extends string,
  IconVariant extends string,
  BaseProps = {},
  ElementRefType = {},
> = IconComponentCoreProps<IconNames, IconVariant, BaseProps, ElementRefType> & {
  name: IconNames
}

export type CreateIconsetOptions<IconNames extends string, IconVariant extends string> = {
  familyName: string
} & IconCoreProps<IconNames, IconVariant>

export type CreateIconFactoryReturnType<P = {}, T = {}> = (iconProps: IconSVG) => IconComponentType<P, T>

export type IconsetComponentCoreType<
  IconNames extends string,
  IconVariant extends string,
  ElementProps = {},
  ElementRefType = {},
> = ComponentType<IconsetCoreProps<IconNames, IconVariant, ElementProps, ElementRefType>>

export type IconComponentType<ElementProps = {}, ElementRefType = {}> = ComponentType<
  IconComponentCoreProps<string, string, ElementProps, ElementRefType>
>

export type CreateFamilyOptions<IconNames extends string, IconVariant extends string> = {
  familyName: string
  colorize?: boolean
  variantsMap: Record<IconVariant, IconsMapType<IconNames>>
  defaultVariant?: IconVariant
}

export type CreateVariantsMapOptions<IconNames extends string, IconVariant extends string> = {
  familyName: string
  colorize?: boolean
  variantNames: IconVariant[]
  variantsMap: Record<IconVariant, IconsMapType<IconNames>>
}
