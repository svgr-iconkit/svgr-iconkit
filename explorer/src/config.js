
export const iconsets = [
  {
    packageName: "@svgr-iconkit/fontawesome5",
    name: "FontAwesome5",
    resources: () => import('./iconset/FontAwesome5'),
  },
  {
    packageName: "@svgr-iconkit/fontawesome5-brands",
    name: "FontAwesome5 - Brands",
    resources: () => import('./iconset/FontAwesome5-brands'),
  },
  {
    packageName: "@svgr-iconkit/fluentui-system",
    name: "FluentUISystem",
    resources: () => import('./iconset/FluentUISystem'),
  },
  {
    packageName: "@svgr-iconkit/feather",
    name: "Feather",
    resources: () => import('./iconset/Feather'),
  },
  {
    packageName: "@svgr-iconkit/foundation",
    name: "Foundation",
    resources: () => import('./iconset/FontAwesome5-brands'),
  },
  {
    packageName: "@svgr-iconkit/entypo",
    name: "Entypo",
    resources: () => import('./iconset/Entypo'),
  },
  {
    packageName: "@svgr-iconkit/ionicons",
    name: "Ionicons",
    resources: () => import('./iconset/Ionicons'),
  },
  {
    packageName: "@svgr-iconkit/material-community",
    name: "Material Community",
    resources: () => import('./iconset/MaterialCommunity'),
  }
];
