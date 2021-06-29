import * as IconsetConfig from '@svgr-iconkit/simple-icons';

export const Icon = IconsetConfig.Iconset;
export const iconNames = IconsetConfig.iconNames || Object.keys(IconsetConfig.map.regular);
export const variantNames = IconsetConfig.variantNames || Object.keys(IconsetConfig.map);
