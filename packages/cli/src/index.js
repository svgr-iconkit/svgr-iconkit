const { Command } = require('commander');
const pkg = require("../package.json");

const program = new Command();
program.version(pkg.version);

const transformCommand = require("./transform");

program.command(transformCommand.name, transformCommand.options).action(transformCommand.exec);

program.parse(process.argv);
