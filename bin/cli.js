#!/usr/bin/env node

"use strict";

const moveComponent = require("../");
const prompts = require("prompts");
const walkSync = require("walk-sync");

const _components = walkSync("app/components", {
  directories: false,
  globs: ["**/component.js"],
});
const components = _components.map((c) => {
  return { title: c.replace("/component.js", "") };
});

const questions = [
  {
    type: "autocomplete",
    name: "componentName",
    message: "Select your component",
    choices: components,
  },
  {
    type: "text",
    name: "destination",
    message: "Where you want to move ?",
  },
];

(async () => {
  const response = await prompts(questions);

  const { componentName, destination } = response;
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
  runCodemods();
})();

function runCodemods() {
  // Run codemod
  if (!dryRun) {
    console.log("Running Codemods: ");
    console.log("------------------");

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
      `tests/integration/components/**/*.js  --from=${componentName} --to=${destination}`,
      "js"
    );
  }
}
