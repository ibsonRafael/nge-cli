#!/usr/bin/env node
const NgECli = require('../index');
const cli = new NgECli(process.argv.slice(2));
cli.run();