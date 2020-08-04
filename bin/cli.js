#!/usr/bin/env node

"use strict";

const moveComponent = require("../");

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

console.log("Running Codemods: ");
console.log("------------------");
// Run codemod
if (!dryRun) {
  // Run template codemods
  require("codemod-cli").runTransform(
    __dirname,
    "rename-components",
    `app/**/*.hbs   --from=${componentName} --to=${destination}`,
    "hbs"
  );

  // Run js codemods

  require("codemod-cli").runTransform(
    __dirname,
    "rename-in-tests",
    `tests/**/*.js  --from=${componentName} --to=${destination}`,
    "js"
  );
}
