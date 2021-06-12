import svgr from "@svgr/core";
import FS from "fs";
import Path from "path";
import ChildProcess from "child_process";
import camelCase from "camelcase";
import cliProgress from "cli-progress";
import { paramCase } from "change-case";
import { readFile, writeFile } from "../utils";
import { createIconsMapTs } from "../templates";

const commandName = "build-map";

module.exports = {
  name: `${commandName} <sourceDir> <targetFile>`,
  options: [
    {
      flag: "-N, --remove-name-prefix <name>",
      description: "Remove name prefix",
    },
  ],
  exec: async (sourceDir, targetFile, options, cmd) => {
    console.log(commandName + ": options=%o", options);

    const resolvedSourceDir = Path.resolve(sourceDir);
    const resolvedTargetFilePath = Path.join(targetFile);

    const relativePathFromTargetFile = Path.relative(Path.dirname(resolvedTargetFilePath), resolvedSourceDir);

    const iconFiles = FS.readdirSync(resolvedSourceDir).filter((file) =>
      file.endsWith(".svg")
    );
    const iconsetMap = {};

    console.log(commandName + ": total icons=%o", iconFiles.length);
    console.log(commandName + ": relativePathFromTargetFile=%o", relativePathFromTargetFile);

    const { removeNamePrefix } = options;

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
      const iconName = paramCase(name);

      iconsetMap[iconName] = `${relativePathFromTargetFile}/${iconFileName}`;

      pbar.increment();
    }
    pbar.stop();

    // Creating icons map typescript files to specified file
    const output = createIconsMapTs(iconsetMap);
    writeFile(resolvedTargetFilePath, output);

    console.log(commandName + ": done");
    return Promise.resolve();
  },
};
