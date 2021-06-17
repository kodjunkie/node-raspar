#!/usr/bin/env node
const Raspar = require("./src/raspar");

if (require.main == module) Raspar.commander(process.argv);
else module.exports = Raspar.resolve;
