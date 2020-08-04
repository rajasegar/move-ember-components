#!/usr/bin/env node

"use strict";

const moveComponent = require("../");
const execa = require("execa");

console.log(process.argv);
const componentName = process.argv[2];
const destination = process.argv[3];
const dryRun: process.argv.includes("--dry-run") || process.argv.includes("-d");
const pods: process.argv.includes("--pods");
const options = {
  componentName,
  destination,
  dryRun,
  pods: true, // hard coding pods TODO: remove later
};

console.log(options);

// Move components
moveComponent(options);

// Run codemod
