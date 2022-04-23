import type { ForwardRefExoticComponent, ReactSVGElement, ReactElement, PropsWithoutRef, RefAttributes } from 'react'
import { ResolveType } from './constants'

export type IconComponentClass<IconNames extends string, IconVariant extends string> = ForwardRefExoticComponent<
  IconsetProps<IconNames, IconVariant>
>

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
  className?: string | number
  style?: Record<string, any>
  id?: string
  fill?: string
  stroke?: string
  strokeWidth?: number | string
  strokeOpacity?: number | string | undefined
  strokeMiterlimit?: number | string | undefined
  strokeDasharray?: string | number | undefined
  strokeDashoffset?: string | number | undefined
  strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit'
  strokeLinejoin?: 'miter' | 'round' | 'bevel' | 'inherit'
  ['data-testid']?: string
  ['testID']?: string
  size?: string | number
  lineHeight?: string | number
  fontSize?: string | number
  color?: string
}

export interface IconsetBaseProps<IconNames extends string, IconVariant extends string> extends IconContentBaseProps {
  name: IconNames
  variant?: IconVariant
}

export type IconBaseProps<IconNames extends string, IconVariant extends string> = {
  resolveType?: ResolveType
  name?: IconNames
  colorize?: boolean
  variantsMap?: IconsetMap<IconNames, IconVariant>
  map?: IconsMapType<IconNames>
  variant?: IconVariant
  defaultVariant?: IconVariant
}

export type IconProps<IconNames extends string, IconVariant extends string> = {
  content?: IconSVG
} & IconBaseProps<IconNames, IconVariant> &
  IconContentBaseProps

export type IconsetProps<IconNames extends string, IconVariant extends string> =
  | (ReactSVGElement & IconsetBaseProps<IconNames, IconVariant>)
  | ReactElement<IconsetBaseProps<IconNames, IconVariant>>

export type CreateIconsetOptions<IconNames extends string, IconVariant extends string> = {
  familyName: string
} & IconBaseProps<IconNames, IconVariant>

export type CreateIconFactoryType<T, P = {}> = (
  iconProps: IconSVG,
) => ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>

export type CreateIconsetFactoryResponseType<
  IconNames extends string,
  IconVariant extends string,
  ElementType = any,
> = ForwardRefExoticComponent<IconsetBaseProps<IconNames, IconVariant> & RefAttributes<ElementType>>

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
