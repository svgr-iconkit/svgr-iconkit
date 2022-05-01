import { NativeIcon } from './NativeIcon'
import type {
  NativeIconBaseComponentProps,
  NativeIconBaseComponentType,
  NativeIconBaseProps,
  NativeIconComponentProps,
  NativeIconComponentType,
  NativeIconContentBaseProps,
  NativeIconContentRefType,
  NativeIconRefType,
} from './types'
export * from '../common/createIconsetFactory'
export * from '../common/types'
export { createNativeFamily as createFamily } from './createNativeFamily'
export { createNativeIcon as createIconComponent } from './createNativeIcon'
export { createNativeIconset as createIconset } from './createNativeIconset'
export { createNativeVariantsMap as createVariantsMap } from './createNativeVariantsMap'
export { NativeIconContent as IconContent } from './NativeIconContent'

export type IconBaseComponentProps<IconNames extends string, IconVariant extends string> = NativeIconBaseComponentProps<
  IconNames,
  IconVariant
>
export type IconBaseComponentType<IconNames extends string, IconVariant extends string> = NativeIconBaseComponentType<
  IconNames,
  IconVariant
>
export type IconComponentProps = NativeIconComponentProps
export type IconComponentType = NativeIconComponentType
export type IconBaseProps = NativeIconBaseProps
export type IconRefType = NativeIconRefType
export type IconContentBaseProps = NativeIconContentBaseProps
export type IconContentRefType = NativeIconContentRefType
export const Icon: IconComponentType = NativeIcon
export default Icon
