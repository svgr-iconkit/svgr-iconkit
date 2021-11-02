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
} from "../utils";
import {
  createIconsMapTs,
  createDefaultExportJs,
  createIndexContent,
  createExportAllJs,
} from "../templates";

const commandName = "deep-copy";

function exploreSvgFiles(parentPath, options) {
  const { contains, fileNameEndsWidth = ".svg" } = options;
  let output = [];
  FS.readdirSync(parentPath).forEach((fileName) => {
    const curDir = Path.join(parentPath, fileName);

    const stats = FS.statSync(curDir);
    if (stats.isDirectory() && !fileName.startsWith(".")) {
      output = output.concat(exploreSvgFiles(curDir, options));
    } else if (fileName.endsWith(fileNameEndsWidth)) {
      if (!contains || (contains && curDir.includes(contains))) {
        output.push(Path.join(parentPath, fileName));
      }
    }
  });

  return output;
}

module.exports = {
  name: commandName + " <sourceDir> <targetDir>",
  options: [
    {
      flag: "-C, --contains <pattern>",
    },
    {
      flag: "-E, --ends-with <name>",
    },
    {
      flag: "-e, --extension <name>",
      description: "File extension. Default is '.svg'",
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
      flag: "-tp, --target-file-prefix <prefixName>",
      description: "Target file prefix",
    },
    {
      flag: "-ts, --target-file-suffix <prefixName>",
      description: "Target file suffix",
    },
  ],
  exec: async (sourceDir, targetDir, options, cmd) => {
    console.log(commandName + ": options=%o", options);
    const {
      removeNamePrefix,
      removeNameSuffix,
      extension = '.svg',
      contains,
      endsWith,
      targetFilePrefix = "",
      targetFileSuffix = "",
    } = options;
    const resolvedSourceDir = Path.resolve(sourceDir);

    if (!FS.existsSync(targetDir)) {
      FS.mkdirSync(targetDir, { recursive: true });
    }
    const targetDirStats = FS.statSync(targetDir);
    if (!targetDirStats.isDirectory()) {
      throw new Error("TargetDir is not a directory.");
    }

    const iconFiles = exploreSvgFiles(resolvedSourceDir, {
      contains: options.contains,
      fileNameEndsWidth: options.endsWith || extension,
    });

    const pbar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    );
    pbar.start(iconFiles.length, 0);
    for (const iconFilePath of iconFiles) {
      const fileName = Path.basename(iconFilePath);
      let name = fileName.replace(extension, "");
      // add support for removeNamePrefix
      if (removeNamePrefix && name.startsWith(removeNamePrefix)) {
        name = name.slice(removeNamePrefix.length);
      }
      // add support for removeNameSuffix
      if (removeNameSuffix && name.endsWith(removeNameSuffix)) {
        name = name.slice(0, name.length - removeNameSuffix.length);
      }

      const tarFileName = `${targetFilePrefix}${name}${targetFileSuffix}${extension}`;
      FS.copyFileSync(iconFilePath, Path.join(targetDir, tarFileName));

      pbar.increment();
    }
    pbar.stop();

    console.log(commandName + ": done");
    return Promise.resolve();
  },
};
