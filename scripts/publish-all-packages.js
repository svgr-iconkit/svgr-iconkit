const FS = require("fs");
const Path = require("path");
const { spawn, exec } = require("child_process");
const { getAllPackageNames } = require("./utils");

const packageDir = Path.resolve(__dirname, "../", "packages");
const allPackagesNames = getAllPackageNames(packageDir);

const packageFolderNames = FS.readdirSync(packageDir);


const toolsDir = Path.resolve(__dirname, "../", "tools");
const toolsFolderNames = FS.readdirSync(toolsDir);

function executeCommand(cwd, name, params = {}) {
  console.info(`${name}: starting`);
  const packagePath = Path.join(cwd, name);

  const isDebug = params['debug'] === 'yes'
  return new Promise((resolve) => {
    try {
      let ended = false;
      const argv = [
        "publish",
        // , "--dry-run"
      ]
      if ( params.registry) {
        argv.push('--registry=' + params.registry)
      }
      if ( params['dry-run']) {
        argv.push('--dry-run')
      }
      const child = spawn(
        "npm",
        argv,
        { cwd: packagePath }
      );
      child.on("exit", () => {
        if (ended) return;
        ended = true;
        resolve();
      });
      child.on("error", (error) => {
        console.error(`${name}# error=`, error);
        if (ended) return;
        ended = true;
        resolve();
      });

      child.stdout.on("data", (data) => {
        if (isDebug) {
          console.log(`${name}# stdout: ${data}`);
        }
      });
      child.stderr.on("data", (data) => {
        if (String(data).startsWith("ERR!") || isDebug) {
          console.log(`${name}# stderr: ${data}`);
        }
      });
    } catch (error) {
      console.error(`${name}# exception`);
      console.error(error);
      resolve();
    }
  });
}

async function run(params = {}) {
  
  for (const name of toolsFolderNames) {
    if (name.startsWith(".")) {
      continue;
    }
    try {
      const packageJsonPath = Path.resolve(
        toolsDir,
        name,
        "package.json"
      );
      const content = JSON.parse(FS.readFileSync(packageJsonPath, "utf-8"));
      if (content.private) {
        console.warn(name + ": private repository not publish...");
      }
      await executeCommand(toolsDir, name, params);
      Î;
    } catch (error) {
      continue;
    }
  }
  for (const name of packageFolderNames) {
    if (name.startsWith(".")) {
      continue;
    }
    try {
      const packageJsonPath = Path.resolve(
        packageDir,
        name,
        "package.json"
      );
      const content = JSON.parse(FS.readFileSync(packageJsonPath, "utf-8"));
      if (content.private) {
        console.warn(name + ": private repository not publish...");
      }
      await executeCommand(packageDir, name, params);
      Î;
    } catch (error) {
      continue;
    }
  }
}

const params = {}
for (const str of process.argv) {
  let matches = /^--([a-z][a-z\-]+)=(.+)$/.exec(str)
  if ( matches) {
    params[matches[1]] = matches[2]
  }
  matches = /^--([a-z][a-z\-]+)$/.exec(str)
  if ( matches) {
    params[matches[1]] = true
  }
  matches = /^-([a-z]+)$/.exec(str)
  if ( matches) {
    params[matches[1]] = true
  }
}

run(params);