import * as IconsetConfig from '@svgr-iconkit/ant-design';

export const Icon = IconsetConfig.Iconset;
export const map = IconsetConfig.map;
export const iconNames = IconsetConfig.iconNames || Object.keys(IconsetConfig.map.regular);
export const variantNames = IconsetConfig.variantNames || Object.keys(IconsetConfig.map);
