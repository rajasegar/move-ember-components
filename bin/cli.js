#!/usr/bin/env node

"use strict";

const moveComponent = require("../");
const execa = require("execa");

const componentName = process.argv[2];
const destination = process.argv[3];
const dryRun =
  process.argv.includes("--dry-run") || process.argv.includes("-d");
const pods = process.argv.includes("--pods");
const options = {
  componentName,
  destination,
  dryRun,
  pods: true, // hard coding pods TODO: remove later
};

// Move components
moveComponent(options);

// Run codemod
require("codemod-cli").runTransform(
  __dirname,
  "rename-components",
  `app/components/**/*.hbs --from=${componentName} --to=${destination}`,
  "hbs"
);
