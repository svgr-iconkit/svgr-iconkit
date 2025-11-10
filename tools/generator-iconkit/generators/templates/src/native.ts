import type { IconsetBaseComponentType, IconVariantsMapType } from '@svgr-iconkit/core/native'
import { createFamily, createVariantsMap } from '@svgr-iconkit/core/native'
import { familyName, iconNames, IconNames, map, variantNames, IconVariant, defaultVariant, colorize } from './config'
export { familyName, iconNames, IconNames, map, variantNames, IconVariant, defaultVariant, colorize }
export const Iconset: IconsetBaseComponentType<IconNames, IconVariant> = createFamily<IconNames, IconVariant>({
  familyName,
  variantsMap: map,
  defaultVariant,
  colorize,
})
export const variants: IconVariantsMapType<IconNames, IconVariant> = createVariantsMap<
  IconNames,
  IconVariant
>({
  familyName,
  variantNames,
  colorize,
  variantsMap: map,
})

export default Iconset
