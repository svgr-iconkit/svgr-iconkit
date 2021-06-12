
# Create owned iconset 

## 1. Create your icons defintion

To provide support in both web and react-native platform, it require define all icons in a shared file. Here we use "config.ts(x)" for the definition.

```typescript
import { IconsetSVG, IconsMapType } from "@svgr-iconkit/core";
export const familyName: string = "IconkitName";

// types
export type IconNames = "danger" | "success" | "arrow-left" | "arrow-right";

// map
export const map: IconsMapType<IconNames> = {};
map["danger"] = {
  name: "danger",
  width: 100,
  height: 100,
  data: [
    {
      name: "path",
      attrs: { d: "/** path data **/"}
    }
  ]
};
// skipped...

```

> If you are trying to generate a folder of svg files, you can execute command 'build-map' from [@svgr-iconkit/cli](/packages/cli) to generate the index. Check ```@svgr-iconkit/foundation```'s [package.json](/packages/ext-foundation/package.json) for the details.



## 2. Export your icons defintion into target channel

Using ```@svgr-iconkit/core``` provided api, you can create an iconset based on your defintion file exposed contexst: ```familyName```, ```map```.

If you would like to support code-hint in most of modern IDE, generate and provide type ```IconNames``` from ```icons.ts(x)``` when using ```createIconset()``` api. Selection should be provided when end-user using ```name``` attribute.

- React.js for Web

Use core package ```@svgr-iconkit/core``` for directly rendering svg content by original SVG html tags.


```typescript
// index.ts
import { createIconset } from "@svgr-iconkit/core";
import { familyName, IconNames, map } from "./config";
export * from "./config";
export const Iconset = createIconset<IconNames>({ familyName, map });
export default Iconset;
```

- React Native

Use core subpackage ```@svgr-iconkit/core/native``` for using ```react-native-svg``` to render svg content

```typescript
// native.ts
import { createIconset } from "@svgr-iconkit/core/native";
import { familyName, IconNames, map } from "./config";
export * from "./config";
export const Iconset = createIconset<IconNames>({ familyName, map });
export default Iconset;
```
