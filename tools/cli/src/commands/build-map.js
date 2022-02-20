import svgr from "@svgr/core";
import FS from "fs";
import Path from "path";
import ChildProcess from "child_process";
import cliProgress from "cli-progress";
import { readFile, writeFile, paramCase, camelCase } from "../utils";
import { createIconsImportMapTs, createIconsMapTs } from "../templates";

const commandName = "build-map";

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
      flag: "-d, --dynamic-import",
      description: "Use dynamic import syntax",
    },
    {
      flag: "-P, --remove-name-prefix <name>",
      description: "Remove name prefix",
    },
    {
      flag: "-S, --remove-name-suffix <name>",
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
  ],
  exec: async (options, cmd) => {
    const {
      inputPath = "",
      ouptutPath = "",
      removeNamePrefix,
      removeNameSuffix,
      startWith = "",
      endWith = "",
      dynamicImport = false,
    } = options;

    const resolvedSourceDir = Path.resolve(inputDir);
    const resolvedTargetFilePath = Path.join(ouptutDir);

    let relativePathFromTargetFile = Path.relative(
      Path.dirname(resolvedTargetFilePath),
      resolvedSourceDir
    );
    if (
      !relativePathFromTargetFile.startsWith(".") &&
      !relativePathFromTargetFile.startsWith("/")
    ) {
      relativePathFromTargetFile = `./${relativePathFromTargetFile}`;
    }

    const startWithPattern = startWith ? startWith : null;
    const endWithPattern = endWith ? `${endWith}.svg` : ".svg";
    const iconFiles = FS.readdirSync(resolvedSourceDir).filter((file) => {
      if (startWithPattern && !file.startsWith(startWithPattern)) return false;
      if (endWithPattern && !file.endsWith(endWithPattern)) return false;
      return true;
    });
    const iconsetMap = {};

    console.log(commandName + ": total icons=%o", iconFiles.length);
    console.log(
      commandName + ": relativePathFromTargetFile=%o",
      relativePathFromTargetFile
    );

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

      iconsetMap[iconName] = `${relativePathFromTargetFile}/${iconFileName}`;

      pbar.increment();
    }
    pbar.stop();

    // Creating icons map typescript files to specified file
    const output = dynamicImport
      ? createIconsImportMapTs(iconsetMap)
      : createIconsMapTs(iconsetMap);
    writeFile(resolvedTargetFilePath, output);

    console.log(commandName + ": done");
    return Promise.resolve();
  },
};
