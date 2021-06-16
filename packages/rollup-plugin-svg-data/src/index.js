const fs = require("fs");
const path = require("path");
const { createFilter } = require("rollup-pluginutils");
const { transformAsync, createConfigItem } = require("@babel/core");
const presetEnv = require("@babel/preset-env");

const { convertSvgData } = require("./utils");

const babelOptions = {
  babelrc: false,
  configFile: false,
  presets: [
    createConfigItem([presetEnv, { modules: false }], { type: "preset" }),
  ],
};

function svgrDataPlugin(options = {}) {
  const filter = createFilter(options.include || "**/*.svg", options.exclude);
  const {
    removeNamePrefix = "",
    convertIconName, 
    babel = true,
    forceWidth,
    forceHeight,
  } = options;

  return {
    name: "svgrData",
    async transform(data, id) {
      if (!filter(id)) return null;
      if (id.slice(-4) !== ".svg") return null;

      const load = fs.readFileSync(id, "utf8");

      const ast = {
        type: "Program",
        sourceType: "module",
        start: 0,
        end: null,
        body: [],
      };
      const baseFileName = path.basename(id);
      let name = baseFileName.slice(0, baseFileName.length - 4);

      // add support for removeNamePrefix
      if (name.startsWith(removeNamePrefix)) {
        name = name.slice(removeNamePrefix.length);
      }

      if (typeof convertIconName === "function") {
        name = convertIconName(baseFileName, name);
      }

      const jsCode = await convertSvgData(name, load, {
        forceWidth,
        forceHeight,
      });
      // console.log("[svgrDataPlugin] name=%s, file=%s", name, id);

      if (babel) {
        const { code } = await transformAsync(jsCode, babelOptions);
        return { code, map: null };
      }

      return { ast, code: jsCode, map: null };
    },
  };
}

module.exports = svgrDataPlugin;
