import svgr from "@svgr/core";
import FS from "fs";
import Path from "path";
import ChildProcess from "child_process";
import cliProgress from "cli-progress";
import {
  readFile,
  writeFile,
  getCamelIconName,
  paramCase,
  camelCase,
  createRootIconset,
} from "../utils";
import {
  createIconsMapTs,
  createDefaultExportJs,
  createIndexContent,
  createExportAllJs,
} from "../templates";

const commandName = "transform";

function buildIconFolder({
  name,
  native = true,
  ref = true,
  indexFile,
  sourcePath,
  targetPath,
}) {
  return new Promise((resolve, reject) => {
    const sourceFileContent = readFile(sourcePath);
    const componentName = "SVG" + camelCase(name, { pascalCase: true });
    svgr(
      sourceFileContent,
      { icon: true, native, ref, typescript: true },
      { componentName }
    )
      .then((jsCode) => {
        if (native) {
          jsCode = jsCode.replace(/ (className|xmlns)=".*"/, "");
        }
        writeFile(targetPath, jsCode);
        resolve();
      })
      .catch((error) => reject(error));
  });
}

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
  name: commandName + " <familyName> <sourceDir> [platform] [targetDir]",
  options: [],
  exec: async (
    familyName,
    sourceDir,
    platformName = "native",
    targetDir = "src",
    options,
    cmd
  ) => {
    const resolvedSourceDir = Path.resolve(sourceDir);
    const resolvedTargetDir = Path.resolve(targetDir);

    const iconFiles = FS.readdirSync(resolvedSourceDir).filter((file) =>
      file.endsWith(".svg")
    );
    const iconsetMap = {};

    const iconFileNames = iconFiles.map((file) => file.replace(".svg", ""));
    console.log(
      commandName + ":[%s] total icons=%o",
      platformName,
      iconFiles.length
    );

    const platformConfig = platforms[platformName];
    const indexFilePath = Path.join(targetDir, platformName, "index.js");

    console.log(commandName + ":[%s] start", platformName);
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
          commandName + ":[%s] Target folder is not a directory. path=%s",
          platformName,
          exportDir
        );
        return Promise.reject(new Error("Target folder is not a directory"));
      }
    }

    const pbar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    );
    pbar.start(iconFiles.length, 0);
    for (const iconFileName of iconFileNames) {
      const iconJsFileName = `${iconFileName}.tsx`;

      iconsetMap[iconFileName] = `./icons/${iconFileName}`;

      await buildIconFolder({
        name: iconFileName,
        native: platformConfig.native,
        sourcePath: Path.join(resolvedSourceDir, `${iconFileName}.svg`),
        targetPath: Path.join(exportDir, iconJsFileName),
      });

      pbar.increment();
    }
    pbar.stop();

    // Create icons map
    if (platformConfig.sourceIndex) {
      const sourceIndexPath = Path.join(targetDir, platformConfig.sourceIndex);
      const mapPath = Path.join(Path.dirname(sourceIndexPath), "map.ts");
      writeFile(mapPath, createIconsMapTs(iconsetMap));
      console.log(
        commandName + ":[%s] created map at %s",
        platformName,
        mapPath
      );
      writeFile(sourceIndexPath, createRootIconset(familyName));
      console.log(
        commandName + ":[%s] created sourceIndex at %s",
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
      writeFile(
        defaultIndexPath,
        createExportAllJs(platformConfig.defaultIndexTarget)
      );

      console.log(
        commandName + ":[%s] created defaultIndex at",
        platformName,
        defaultIndexPath
      );
    }

    console.log(commandName + ": done");
    return Promise.resolve();
  },
};
