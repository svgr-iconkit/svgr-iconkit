import type {
  WebIconBaseComponentProps,
  WebIconBaseComponentType,
  WebIconBaseProps,
  WebIconComponentProps,
  WebIconComponentType,
  WebIconContentBaseProps,
  WebIconContentRefType,
  WebIconRefType,
  WebIconsetBaseComponentType,
  WebIconVariantsMapType,
} from './types'
import { WebIcon } from './WebIcon'
export * from '../common/createIconsetFactory'
export * from '../common/types'
export { createWebFamily as createFamily } from './createWebFamily'
export { createWebIcon as createIconComponent } from './createWebIcon'
export { createWebIconset as createIconset } from './createWebIconset'
export { createWebVariantsMap as createVariantsMap } from './createWebVariantsMap'
export { WebIconContent as IconContent } from './WebIconContent'

export type IconBaseComponentProps<IconNames extends string, IconVariant extends string> = WebIconBaseComponentProps<
  IconNames,
  IconVariant
>
export type IconBaseComponentType<IconNames extends string, IconVariant extends string> = WebIconBaseComponentType<
  IconNames,
  IconVariant
>
export type IconsetBaseComponentType<
  IconNames extends string,
  IconVariant extends string,
> = WebIconsetBaseComponentType<IconNames, IconVariant>
export type IconVariantsMapType<IconNames extends string, IconVariant extends string> = WebIconVariantsMapType<
  IconNames,
  IconVariant
>
export type IconComponentProps = WebIconComponentProps
export type IconComponentType = WebIconComponentType
export type IconBaseProps = WebIconBaseProps
export type IconRefType = WebIconRefType
export type IconContentBaseProps = WebIconContentBaseProps
export type IconContentRefType = WebIconContentRefType
export const Icon: WebIconComponentType = WebIcon
export default Icon
