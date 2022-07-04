const FS = require("fs");
const Path = require("path");
const { spawn, exec } = require("child_process");
const { getAllPackageNames } = require("./utils");
const { reject } = require("lodash");

const packageDir = Path.resolve(__dirname, "../", "packages");
const allPackagesNames = getAllPackageNames(packageDir);

const packageFolderNames = FS.readdirSync(packageDir);

const toolsDir = Path.resolve(__dirname, "../", "tools");
const toolsFolderNames = FS.readdirSync(toolsDir);

function executeCommand(cwd, name, params = {}) {
  console.info(`${name}: starting`);
  const packagePath = Path.join(cwd, name);

  const isDebug = params["debug"] === "yes";
  const isBreakOnError = params["breakOnError"] === "yes";
  return new Promise((resolve) => {
    let hasError = false;
    try {
      let ended = false;
      const argv = [
        "publish",
        // , "--dry-run"
      ];
      if (params.registry) {
        argv.push("--registry=" + params.registry);
      }
      if (params["dry-run"]) {
        argv.push("--dry-run");
      }
      const child = spawn("yarn", argv, { cwd: packagePath });
      child.on("close", () => {
        console.info(`${name}: closed`);
        if (ended) return;
        ended = true;
        hasError
          ? reject(new Error(`Detected error for task: ${name}`))
          : resolve();
      });
      child.on("exit", () => {
        console.info(`${name}: exit`);
        if (ended) return;
        ended = true;

        hasError
          ? reject(new Error(`Detected error for task: ${name}`))
          : resolve();
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
        const isError = String(data).startsWith("ERR!");
        if (isError) {
          hasError = true;
        }
        // if (String(data).startsWith("ERR!") || isDebug) {
          console.log(`${name}# stderr: ${data}`);
        // }
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
      const packageJsonPath = Path.resolve(toolsDir, name, "package.json");
      const content = JSON.parse(FS.readFileSync(packageJsonPath, "utf-8"));
      if (content.private) {
        console.warn(name + ": private repository not publish...");
      }
      await executeCommand(toolsDir, name, params);
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }
  for (const name of packageFolderNames) {
    if (name.startsWith(".")) {
      continue;
    }
    try {
      const packageJsonPath = Path.resolve(packageDir, name, "package.json");
      const content = JSON.parse(FS.readFileSync(packageJsonPath, "utf-8"));
      if (content.private) {
        console.warn(name + ": private repository not publish...");
      }
      await executeCommand(packageDir, name, params);
    } catch (error) {
      console.error(error)

      if (isBreakOnError) {
        process.exit(1)
      }
    }
  }
}

const params = {};
for (const str of process.argv) {
  let matches = /^--([a-z][a-z\-]+)=(.+)$/.exec(str);
  if (matches) {
    params[matches[1]] = matches[2];
  }
  matches = /^--([a-z][a-z\-]+)$/.exec(str);
  if (matches) {
    params[matches[1]] = true;
  }
  matches = /^-([a-z]+)$/.exec(str);
  if (matches) {
    params[matches[1]] = true;
  }
}

run(params);
