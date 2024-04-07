import svgr from "@svgr/core";
import FS from "fs";
import Path from "path";
import ChildProcess from "child_process";
import cliProgress from "cli-progress";
import { convertSvgData } from "@svgr-iconkit/build-utils";
import { camelCase, paramCase } from '@svgr-iconkit/common-utils'
import {
  fileOptions,
  readFile,
  writeFile,
  resolvePackagePath,
} from "../utils";
import { createIconsImportMapTs, createIconsMapTs } from "../templates";

const commandName = "convert-data";

module.exports = {
  name: `${commandName}`,
  options: [
    {
      flag: "-i, --input-path <input-path>",
      description: "Input path",
    },
    {
      flag: "-o, --output-path <output-path>",
      description: "Output path",
    },
    {
      flag: "-p, --package-name <packageName>",
      description: "inputPath resolved by a package",
    },
    {
      flag: "-d, --dynamic-import",
      description: "Use dynamic import syntax",
    },
    {
      flag: "-rp, --remove-name-prefix <name>",
      description: "Remove name prefix",
    },
    {
      flag: "-rs, --remove-name-suffix <name>",
      description: "Remove name suffix",
    },
    {
      flag: "-s, --start-with <content>",
      description: "Searching file name start with given string",
    },
    {
      flag: "-e, --end-with <content>",
      description: "Searching file name end with given string",
    },
    {
      flag: "--not-end-with <name>",
    },
    {
      flag: "-tp, --target-file-prefix <prefixName>",
      description: "Target file prefix",
    },
    {
      flag: "-ts, --target-file-suffix <prefixName>",
      description: "Target file suffix",
    },
    {
      flag: "--disable-convert-xlink",
    },
    {
      flag: "--fill-color <color>",
    },
    {
      flag: "--stroke-color <color>",
    },
  ],
  exec: async (options, cmd) => {
    console.log(commandName + ": options=%o", options);
    const {
      inputPath = "",
      outputPath = "",
      removeNamePrefix,
      removeNameSuffix,
      startWith = "",
      endWith = "",
      notEndWith,
      packageName,
      targetFilePrefix = "",
      targetFileSuffix = "",
      fillColor,
      strokeColor,
      disableConvertXlink = false,
      dynamicImport = false,
    } = options;

    if (!FS.existsSync(outputPath)) {
      FS.mkdirSync(outputPath, { recursive: true });
    }
    // Selecting parent directory, direct is local
    let _parentDirectory = process.cwd();
    if (packageName) {
      _parentDirectory = await resolvePackagePath(packageName)
    }
    // If given inputPath from a root absolute path, ignore _parentDirectory.
    if (String(inputPath).startsWith("/")) {
      _parentDirectory = null;
    }
    // Getting source directory from local
    const resolvedSourceDir = _parentDirectory
      ? Path.resolve(_parentDirectory, inputPath)
      : Path.resolve(inputPath);

    console.log(commandName + ": Getting source from %s, %s", _parentDirectory, inputPath);

    const resolvedTargetDir = Path.resolve(outputPath);
    const resolvedTargetIndexFilePath = Path.join(outputPath, "index.ts");

    const startWithPattern = startWith ? startWith : null;
    const endWithPattern = endWith ? `${endWith}.svg` : ".svg";
    const notEndWithPattern = notEndWith ? `${notEndWith}.svg` : null;
    const iconFiles = FS.readdirSync(resolvedSourceDir).filter((file) => {
      if (startWithPattern && !file.startsWith(startWithPattern)) return false;
      if (endWithPattern && !file.endsWith(endWithPattern)) return false;
      if (notEndWithPattern && file.endsWith(notEndWithPattern)) return false;
      return true;
    });
    const iconsetMap = {};

    console.log(commandName + ": total icons=%o", iconFiles.length);
    console.log(commandName + ": resolvedTargetDir=%o", resolvedTargetDir);

    const pbar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    );
    pbar.start(iconFiles.length, 0);
    for (const iconFileName of iconFiles) {
      let name = iconFileName.replace(".svg", "");
      // add support for removeNamePrefix
      if (removeNamePrefix && name.startsWith(removeNamePrefix)) {
        name = name.slice(removeNamePrefix.length);
      }
      // add support for removeNameSuffix
      if (removeNameSuffix && name.endsWith(removeNameSuffix)) {
        name = name.slice(0, name.length - removeNameSuffix.length);
      }
      const iconName = paramCase(name);

      const tarFileName = `${targetFilePrefix}${iconName}${targetFileSuffix}`;

      const srcFilePath = Path.resolve(resolvedSourceDir, iconFileName);
      const tarFilePath = Path.resolve(resolvedTargetDir, tarFileName + ".ts");
      const srcFileContent = readFile(srcFilePath);
      const tarFileContent = convertSvgData(iconName, srcFileContent, {
        fillColor,
        strokeColor,
        typescript: true,
        disableConvertXlink,
      });
      writeFile(tarFilePath, tarFileContent);

      iconsetMap[iconName] = `./${tarFileName}`;

      pbar.increment();
    }
    pbar.stop();

    // Creating icons map typescript files to specified file
    const output = dynamicImport
      ? createIconsImportMapTs(iconsetMap)
      : createIconsMapTs(iconsetMap);
    writeFile(resolvedTargetIndexFilePath, output);

    console.log(commandName + ": done");
    return Promise.resolve();
  },
};
