import type { ComponentType, ForwardedRef, SVGAttributes } from 'react'
import type { IconComponentCoreProps, IconsetComponentCoreType } from '../common/types'

export type WebIconRefType = SVGSVGElement

export type WebIconBaseProps = SVGAttributes<SVGSVGElement>

export type WebIconForwardedRef = ForwardedRef<WebIconRefType>

export type WebIconContentRefType = SVGElement

export type WebIconContentBaseProps = SVGAttributes<SVGElement>

export type WebIconBaseComponentProps<IconNames extends string, IconVariant extends string> = IconComponentCoreProps<
  IconNames,
  IconVariant,
  WebIconBaseProps,
  WebIconRefType
>

export type WebIconBaseComponentType<IconNames extends string, IconVariant extends string> = WebIconBaseComponentProps<
  IconNames,
  IconVariant
>

export type WebIconsetBaseComponentType<
IconNames extends string,
IconVariant extends string,
> = IconsetComponentCoreType<IconNames, IconVariant, 
WebIconBaseProps,
WebIconRefType>

export type WebIconVariantsMapType<IconNames extends string, IconVariant extends string> = Record<IconVariant, WebIconsetBaseComponentType<IconNames, IconVariant>>;

export type WebIconComponentProps = WebIconBaseComponentProps<string, string>

export type WebIconComponentType = ComponentType<WebIconComponentProps>
