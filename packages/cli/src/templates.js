import { getCamelIconName } from "./utils";

export const createDefaultExportJs = (path) => `
module.exports = require('./${path}');
`;

const createExportAllJs = (path) => `
export { default } from "./${path}";
export * from "./${path}";
`;

export const createIndexContent = (files) => `
const map = {
${files
  .map((fileName) => {
    const fileNameWithoutJs = fileName.replace(".js", "");
    return `'${fileNameWithoutJs}': require('./${fileNameWithoutJs}')`;
  })
  .join(",\n")}
};
module.exports = map;
`;

export const createIconsMapTs = (map = {}) => {
  const iconNames = Object.keys(map);
  const importStr = iconNames
    .map((iconName) => {
      const name = getCamelIconName(iconName);
      return `import ${name} from "${map[iconName]}"`;
    })
    .join(";\n");

  const mapStr = iconNames
    .map((iconName) => {
      const name = getCamelIconName(iconName);
      return `"${iconName}": ${name}`;
    })
    .join(",\n");

  const nameTypesStr = iconNames.map((iconName) => `"${iconName}"`).join(" | ");
  return `
import { IconsMapType } from "@svgr-iconkit/core";

// import assets
${importStr}

// types
export type IconNames = ${nameTypesStr};

// map
export const map: IconsMapType<IconNames> = {
${mapStr}
};

`;
};
