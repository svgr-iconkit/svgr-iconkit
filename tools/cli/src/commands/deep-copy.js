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
  resolvePackagePath,
} from "../utils";
import {
  createIconsMapTs,
  createDefaultExportJs,
  createIndexContent,
  createExportAllJs,
} from "../templates";

const commandName = "deep-copy";

function exploreSvgFiles(parentPath, options) {
  const { contains, fileNameEndsWidth = ".svg", fileNameNotEndsWidth } = options;
  let output = [];
  FS.readdirSync(parentPath).forEach((fileName) => {
    const curDir = Path.join(parentPath, fileName);

    const stats = FS.statSync(curDir);
    if (stats.isDirectory() && !fileName.startsWith(".")) {
      output = output.concat(exploreSvgFiles(curDir, options));
    } else if (fileName.endsWith(fileNameEndsWidth)) {

      // Skipped when pattern not matched
      if (fileNameNotEndsWidth && fileName.endsWith(fileNameNotEndsWidth)) {
        return;
      }

      if (!contains || (contains && curDir.includes(contains))) {
        output.push(Path.join(parentPath, fileName));
      }
    }
  });

  return output;
}

module.exports = {
  name: commandName + "",
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
      flag: "-C, --contains <pattern>",
    },
    {
      flag: "-E, --ends-with <name>",
    },
    {
      flag: "--not-ends-with <name>",
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
  exec: async (options, cmd) => {
    console.log(commandName + ": options=%o", options);
    const {
      inputPath = "",
      outputPath = "",
      packageName,
      removeNamePrefix,
      removeNameSuffix,
      extension = '.svg',
      contains,
      endsWith,
      notEndsWith,
      targetFilePrefix = "",
      targetFileSuffix = "",
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

    const outputPathStats = FS.statSync(outputPath);
    if (!outputPathStats.isDirectory()) {
      throw new Error(commandName + ": TargetDir is not a directory.");
    }

    const iconFiles = exploreSvgFiles(resolvedSourceDir, {
      contains: options.contains,
      fileNameEndsWidth: options.endsWith || extension,
      fileNameNotEndsWidth: notEndsWith,
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
      FS.copyFileSync(iconFilePath, Path.join(outputPath, tarFileName));

      pbar.increment();
    }
    pbar.stop();

    console.log(commandName + ": done");
    return Promise.resolve();
  },
};
