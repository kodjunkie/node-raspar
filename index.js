#!/usr/bin/env node

const Vibe = require("./src/vibe");
const Package = require("./package.json");

if (require.main == module) {
  const { Command } = require("commander");

  const program = new Command();
  program
    .version(Package.version)
    .name(Package.name)
    .usage("[options] <command>");

  program
    .command("api", { isDefault: true })
    .description("Start vibe as a REST API")
    .action(() => {
      console.log("Vibe API is running...");
    });

  program.parse(process.argv);

  const arg = process.argv.slice(2);
  if (!arg || arg != "api") program.help();
} else module.exports = Vibe;
