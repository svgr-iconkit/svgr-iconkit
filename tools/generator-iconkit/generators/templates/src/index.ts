import type { IconsetBaseComponentType, IconVariantsMapType } from '@svgr-iconkit/core'
import { createFamily, createVariantsMap } from '@svgr-iconkit/core'
import { colorize, defaultVariant, familyName, iconNames, IconNames, IconVariant, map, variantNames } from './config'
export { colorize, defaultVariant, familyName, iconNames, IconNames, IconVariant, map, variantNames }
export const Iconset: IconsetBaseComponentType<IconNames, IconVariant> = createFamily<IconNames, IconVariant>({
  familyName,
  variantsMap: map,
  defaultVariant,
  colorize,
})
export const variants: IconVariantsMapType<IconNames, IconVariant> = createVariantsMap<IconNames, IconVariant>({
  familyName,
  variantNames,
  colorize,
  variantsMap: map,
})

export default Iconset
