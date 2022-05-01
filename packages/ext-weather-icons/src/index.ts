import { createFamily, createVariantsMap, IconsetBaseComponentType, IconVariantsMapType } from '@svgr-iconkit/core'
import { familyName, IconNames, map, variantNames, IconVariant, defaultVariant, colorize } from './config'
export * from './config'
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
