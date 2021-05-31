import svgr from "@svgr/core";
import FS from "fs";
import Path from "path";
import ChildProcess from "child_process";
import camelCase from "camelcase";
import cliProgress from "cli-progress";

const fileOptions = {
  encoding: "utf-8",
};

function buildIconFolder({
  name,
  native = true,
  ref = true,
  indexFile,
  sourcePath,
  targetPath,
}) {
  return new Promise((resolve, reject) => {
    const sourceFileContent = FS.readFileSync(sourcePath, fileOptions);
    const componentName = "SVG" + camelCase(name, { pascalCase: true });
    svgr(
      sourceFileContent,
      { icon: true, native, ref, typescript: true },
      { componentName }
    )
      .then((jsCode) => {
        if ( native ) {
          jsCode = jsCode.replace(' xmlns="http://www.w3.org/2000/svg"', '')
          jsCode = jsCode.replace(/ className=".*"/, '')
        }
        FS.writeFileSync(targetPath, jsCode, fileOptions);
        resolve();
      })
      .catch((error) => reject(error));
  });
}

const createIndexContent = (files) => `
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

const getCamelIconName = (iconName) =>
  `SVG_${camelCase(iconName, { pascalCase: true })}`;

const createIconsMapTs = (map = {}) => {
  const importStr = Object.keys(map)
    .map((iconName) => {
      const name = getCamelIconName(iconName);
      return `import ${name} from "./icons/${map[iconName]}"`;
    })
    .join(";\n");

  const mapStr = Object.keys(map)
    .map((iconName) => {
      const name = getCamelIconName(iconName);
      return `"${iconName}": ${name}`;
    })
    .join(",\n");

  const nameTypesStr = Object.keys(map)
  .map((iconName) => `"${iconName}"`)
  .join(" | ");
  return `
import { IconsMapType } from "@svgr-iconkit/core";

// assets  
${importStr}

// types
export type IconNames = ${nameTypesStr};

// map
export const map: IconsMapType<IconNames> = {
${mapStr}
};

`;
};

const createDefaultExportJs = (path) => `
module.exports = require('./${path}');
`;

const createDefaultIconsetTs = (path) => `
export { default } from "./${path}";
export * from "./${path}";
`;

const createRootIconset = (family) => `
import React from "react";
import { createIconset } from "@svgr-iconkit/core";
import { IconNames, map } from "./map";
export const familyName: string = ${JSON.stringify(family)};
export const Iconset = createIconset<IconNames>({familyName, map});

export default Iconset;
`;

const platforms = {
  web: {
    native: false,
    sourceIndex: "web/index.ts",
    defaultIndex: "index.ts",
    defaultIndexTarget: "web/index",
  },
  native: {
    native: true,
    sourceIndex: "native/index.ts",
  },
};
module.exports = {
  name: "transform <familyName> <sourceDir> [targetDir]",
  options: {},
  exec: async (familyName, sourceDir, targetDir = "src") => {
    const resolvedSourceDir = Path.resolve(sourceDir);
    const resolvedTargetDir = Path.resolve(targetDir);

    const iconFiles = FS.readdirSync(resolvedSourceDir).filter((file) =>
      file.endsWith(".svg")
    );
    const iconsetMap = {};

    const iconFileNames = iconFiles.map((file) => file.replace(".svg", ""));
    console.log("transform: total icons=%o", iconFiles.length);

    for (const platformName in platforms) {
      const platformConfig = platforms[platformName];
      const indexFilePath = Path.join(targetDir, platformName, "index.js");

      console.log("transform[%s] start", platformName);
      const exportDir = Path.join(resolvedTargetDir, platformName, "icons");

      // Remove folder
      ChildProcess.execSync(`rm -rf ${exportDir}`);

      const folderExists = FS.existsSync(exportDir);
      if (!folderExists) {
        FS.mkdirSync(exportDir, { recursive: true });
      } else {
        const folderStats = FS.statSync(exportDir);
        if (!folderStats.isDirectory()) {
          console.error(
            "transform[%s] Target folder is not a directory. path=%s",
            platformName,
            exportDir
          );
          return Promise.reject(new Error("Target folder is not a directory"));
        }
      }
      if (!iconsetMap[platformName]) {
        iconsetMap[platformName] = {};
      }
      const pbar = new cliProgress.SingleBar(
        {},
        cliProgress.Presets.shades_classic
      );
      pbar.start(iconFiles.length, 0);
      for (const iconFileName of iconFileNames) {
        const iconJsFileName = `${iconFileName}.tsx`;

        iconsetMap[platformName][iconFileName] = `${iconFileName}`;

        await buildIconFolder({
          name: iconFileName,
          native: platformConfig.native,
          sourcePath: Path.join(resolvedSourceDir, `${iconFileName}.svg`),
          targetPath: Path.join(
            exportDir,
            iconJsFileName
          ),
        });

        pbar.increment();
      }
      pbar.stop();

      // Create icons map
      if (platformConfig.sourceIndex) {
        const sourceIndexPath = Path.join(
          targetDir,
          platformConfig.sourceIndex
        );
        const mapPath = Path.join(Path.dirname(sourceIndexPath), "map.ts");
        FS.writeFileSync(
          mapPath,
          createIconsMapTs(iconsetMap[platformName]),
          fileOptions
        );
        console.log("transform[%s] created map at %s", platformName, mapPath);
        FS.writeFileSync(
          sourceIndexPath,
          createRootIconset(familyName),
          fileOptions
        );
        console.log(
          "transform[%s] created sourceIndex at %s",
          platformName,
          sourceIndexPath
        );
      }

      // Create default index in source files
      if (platformConfig.defaultIndex) {
        const defaultIndexPath = Path.join(
          targetDir,
          platformConfig.defaultIndex
        );
        FS.writeFileSync(
          defaultIndexPath,
          createDefaultIconsetTs(platformConfig.defaultIndexTarget),
          fileOptions
        );

        console.log(
          "transform[%s] created defaultIndex at",
          platformName,
          defaultIndexPath
        );
      }

    }
    console.log("transform: done");
    return Promise.resolve();
  },
};
