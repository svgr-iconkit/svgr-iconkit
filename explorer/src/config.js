import * as FARIconKit from "@svgr-iconkit/fontawesome5";
import * as FABIconKit from "@svgr-iconkit/fontawesome5-brands";

import * as EntypoIconKit from "@svgr-iconkit/entypo";
import * as FeatherIconKit from "@svgr-iconkit/feather";
import * as FoundationIconKit from "@svgr-iconkit/foundation";
import * as FluentUISystemIconKit from "@svgr-iconkit/fluentui-system";
import * as MaterialCommunityIconKit from "@svgr-iconkit/material-community";
import * as IoniconsIconKit from "@svgr-iconkit/ionicons";

export const iconsets = [
  {
    packageName: "@svgr-iconkit/fontawesome5",
    name: "FontAwesome5",
    component: FARIconKit.Iconset,
    variantNames: Object.keys(FARIconKit.map),
    iconNames: Object.keys(FARIconKit.map.regular)
  },
  {
    packageName: "@svgr-iconkit/fontawesome5-brands",
    name: "FontAwesome5 - Brands",
    component: FABIconKit.Iconset,
    variantNames: Object.keys(FABIconKit.map),
    iconNames: Object.keys(FABIconKit.map.regular)
  },
  {
    packageName: "@svgr-iconkit/fluentui-system",
    name: "FluentUISystem",
    component: FluentUISystemIconKit.Iconset,
    variantNames: Object.keys(FluentUISystemIconKit.map),
    iconNames: Object.keys(FluentUISystemIconKit.map.regular)
  },
  {
    packageName: "@svgr-iconkit/feather",
    name: "Feather",
    component: FeatherIconKit.Iconset,
    variantNames: Object.keys(FeatherIconKit.map),
    iconNames: Object.keys(FeatherIconKit.map.regular)
  },
  {
    packageName: "@svgr-iconkit/foundation",
    name: "Foundation",
    component: FoundationIconKit.Iconset,
    variantNames: Object.keys(FoundationIconKit.map),
    iconNames: Object.keys(FoundationIconKit.map.regular)
  },
  {
    packageName: "@svgr-iconkit/entypo",
    name: "Entypo",
    component: EntypoIconKit.Iconset,
    variantNames: Object.keys(EntypoIconKit.map),
    iconNames: Object.keys(EntypoIconKit.map.regular)
  },
  {
    packageName: "@svgr-iconkit/ionicons",
    name: "Ionicons",
    component: IoniconsIconKit.Iconset,
    variantNames: Object.keys(IoniconsIconKit.map),
    iconNames: Object.keys(IoniconsIconKit.map.regular)
  },
  {
    packageName: "@svgr-iconkit/material-community",
    name: "Material Community",
    component: MaterialCommunityIconKit.Iconset,
    variantNames: Object.keys(MaterialCommunityIconKit.map),
    iconNames: Object.keys(MaterialCommunityIconKit.map.regular)
  }
];
