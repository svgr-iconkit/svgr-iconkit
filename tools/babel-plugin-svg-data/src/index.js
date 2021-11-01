const FS = require("fs");
const Path = require("path");
const { transformAsync, createConfigItem } = require("@babel/core");
const presetEnv = require("@babel/preset-env");

const { convertSvgData } = require("@svgr-iconkit/build-utils");

function svgrDataPlugin(api, options = {}) {
  const {
    removeNamePrefix = "",
    convertIconName,
    forceWidth,
    forceHeight,
    fillColor = null,
    strokeColor = null,
  } = options;

  return {
    visitor: {
      async Program(path) {
        const { types: t } = api;

        const sourceData = path.node.body[0].expression;

        const ast = {
          type: "Program",
          sourceType: "module",
          start: 0,
          end: null,
          body: [],
        };
        const baseFileName = Path.basename(path);
        let name = baseFileName.slice(0, baseFileName.length - 4);

        // add support for removeNamePrefix
        if (name.startsWith(removeNamePrefix)) {
          name = name.slice(removeNamePrefix.length);
        }

        if (typeof convertIconName === "function") {
          name = convertIconName(baseFileName, name);
        }

        const jsCode = await convertSvgData(name, sourceData, {
          fillColor,
          strokeColor,
          forceWidth,
          forceHeight,
        });
        path.node.body = [jsCode];
        path.replaceWith(path.node);
      },
    },
  };
}

module.exports = svgrDataPlugin;
