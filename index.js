#!/usr/bin/env node

const Raspar = require("./src/raspar");

if (require.main == module) {
  const Package = require("./package.json");
  const { Command } = require("commander");
  const packageName = Package.name;
  const program = new Command();

  program
    .version(Package.version)
    .name(packageName)
    .usage("[options] <command>");

  program
    .command("api", { isDefault: true })
    .description(`Start ${packageName} as a REST API`)
    .action(() => {
      console.log("Raspar API is running...");
    });

  program.parse(process.argv);
  const arg = process.argv.slice(2);

  if (!arg || arg != "api") program.help();
} else module.exports = Raspar;
