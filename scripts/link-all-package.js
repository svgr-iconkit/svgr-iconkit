const Path = require("path");
const { execSync } = require('child_process');
const { getAllPackageNames } = require('./utils');


const packageDir = Path.resolve(__dirname, "../", "packages");
const allPackagesNames = getAllPackageNames(packageDir);

console.log("Linking below packages: %o", allPackagesNames );
execSync("yarn link " + allPackagesNames.join(" "));
