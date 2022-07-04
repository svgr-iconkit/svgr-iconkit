import type { Component, ComponentClass, ComponentType, ForwardedRef, PropsWithChildren } from 'react'
import type { CommonPathProps, GProps, SvgProps, SymbolProps } from 'react-native-svg'
import { IconComponentCoreProps, IconsetComponentCoreType } from '../common/types'

export type NativeIconRefType = Component<SvgProps>

/**
 * Workaround: ```color``` from ```SvgProps``` is conflict with ```IconComponentProps```.
 */
export type NativeIconBaseProps = PropsWithChildren<Omit<SvgProps, "color">>

export type NativeIconForwardedRef = ForwardedRef<NativeIconRefType>

export type NativeIconContentRefType = ComponentClass<GProps | SymbolProps | CommonPathProps>

export type NativeIconContentBaseProps = PropsWithChildren<GProps | SymbolProps | CommonPathProps>

export type NativeIconBaseComponentProps<IconNames extends string, IconVariant extends string> = IconComponentCoreProps<
  IconNames,
  IconVariant,
  NativeIconBaseProps,
  NativeIconRefType
>
export type NativeIconBaseComponentType<
  IconNames extends string,
  IconVariant extends string,
> = NativeIconBaseComponentProps<IconNames, IconVariant>

export type NativeIconsetBaseComponentType<
  IconNames extends string,
  IconVariant extends string,
> = IconsetComponentCoreType<IconNames, IconVariant, NativeIconBaseProps, NativeIconRefType>

export type NativeIconVariantsMapType<IconNames extends string, IconVariant extends string> = Record<
  IconVariant,
  NativeIconsetBaseComponentType<IconNames, IconVariant>
>

export type NativeIconComponentProps = NativeIconBaseComponentProps<string, string>

export type NativeIconComponentType = ComponentType<NativeIconComponentProps>
