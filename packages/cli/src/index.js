const { Command } = require("commander");
const pkg = require("../package.json");

const program = new Command();
program.version(pkg.version);

const commands = [
  require("./commands/transform"),
  require("./commands/build-map"),
];

commands.forEach((commandConfig) => {
  const { name, description, options, exec } = commandConfig;
  let cmd = program.command(name, description || "");
  if (options && Array.isArray(options)) {
    options.forEach((option) => {
      const {
        flag,
        description: optionDesc,
        defaultValue: optionDefValue,
      } = option;
      cmd = cmd.option(flag, optionDesc, optionDefValue);
    });
  }
  cmd = cmd.action(exec);
});

program.parse(process.argv);
