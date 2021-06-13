const { execSync } = require("child_process");
const packageJson = require("../package.json");

const svgPackages = Object.keys(packageJson.dependencies).filter( name => name.startsWith("@svgr-iconkit/"));

svgPackages.forEach( (name) => {
  execSync(`yarn link ${name}`);
})