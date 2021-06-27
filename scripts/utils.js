const FS = require("fs");
const Path = require("path");

const scopeName = "@svgr-iconkit/";

function getAllPackageNames(path) {
  const subpackageNames = FS.readdirSync(path)
    .filter((fileName) => fileName.startsWith("ext-"))
    .map((fileName) => fileName.replace("ext-", ""));

  const allPackagesNames = [scopeName + "core"].concat(
    subpackageNames.map((name) => scopeName + name)
  );
  return allPackagesNames;
}

module.exports = {
  getAllPackageNames,
}