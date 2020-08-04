"use strict";

const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");

const { log, error, ok, warning } = require("./logging");

module.exports = function (options) {
  const componentPath = "app/components";
  const { componentFolder, componentName, destination, dryRun, pods } = options;
  const packagePath = path.join("app/components", destination);

  // Moving component.js
  // IMPORTANT NOTE: We're deliberately avoiding POD structure in engines
  // Hence, the components are moved appropriately splitting the js and hbs
  // from a single folder
  log("Moving component.js");
  log("---------------");
  let sourceComponent;

  if (pods) {
    sourceComponent = componentFolder
      ? `${componentPath}/${componentFolder}/${componentName}/component.js`
      : `${componentPath}/${componentName}/component.js`;
  } else {
    sourceComponent = componentFolder
      ? `${componentPath}/${componentFolder}/${componentName}.js`
      : `${componentPath}/${componentName}.js`;
  }

  const destComponent = `${packagePath}/${componentName}/component.js`;

  log(sourceComponent);
  log(destComponent);

  if (!dryRun) {
    fse
      .move(sourceComponent, destComponent)
      .then(() => {
        ok(`Success: Component ${sourceComponent} moved`);
      })
      .catch((err) => error(err));
  }

  // Moving component template.hbs
  log("\nMoving component template.hbs");
  log("-------------------------");

  let sourceTemplate;
  if (pods) {
    sourceTemplate = componentFolder
      ? `${componentPath}/${componentFolder}/${componentName}/template.hbs`
      : `${componentPath}/${componentName}/template.hbs`;
  } else {
    sourceTemplate = componentFolder
      ? `app/templates/components/${componentFolder}/${componentName}.hbs`
      : `app/templates/components/${componentName}.hbs`;
  }
  const destTemplate = `${packagePath}/${componentName}/template.hbs`;

  log(sourceTemplate);
  log(destTemplate);

  if (!dryRun) {
    fse
      .move(sourceTemplate, destTemplate)
      .then(() => {
        ok(`Success: Component Template ${sourceTemplate} moved`);
      })
      .catch((err) => error(err));
  }

  // Moving component style.scss
  log("\nMoving component style.scss");
  log("-------------------------");

  let sourceStyle;
  if (pods) {
    sourceStyle = componentFolder
      ? `${componentPath}/${componentFolder}/${componentName}/style.scss`
      : `${componentPath}/${componentName}/style.scss`;
  } else {
    sourceStyle = componentFolder
      ? `app/templates/components/${componentFolder}/${componentName}.scss`
      : `app/templates/components/${componentName}.scss`;
  }
  const destStyle = `${packagePath}/${componentName}/style.scss`;

  log(sourceStyle);
  log(destStyle);

  if (!dryRun) {
    if (fs.existsSync(sourceStyle)) {
      fse
        .move(sourceStyle, destStyle)
        .then(() => {
          ok(`Success: Component Style ${sourceStyle} moved`);
        })
        .catch((err) => error(err));
    } else {
      warning(`WARNING: There are no styles for component ${componentName}`);
    }
  }

  // Moving component tests
  log("\nMoving component tests");
  log("------------------");
  let sourceTest;
  if (pods) {
    sourceTest = componentFolder
      ? `tests/integration/components/${componentFolder}/${componentName}/component-test.js`
      : `tests/integration/components/${componentName}/component-test.js`;
  } else {
    sourceTest = componentFolder
      ? `tests/integration/components/${componentFolder}/${componentName}-test.js`
      : `tests/integration/components/${componentName}-test.js`;
  }

  const destTest = `tests/integration/components/${destination}/${componentName}/component-test.js`;

  log(sourceTest);
  log(destTest);
  if (!dryRun) {
    if (fs.existsSync(sourceTest)) {
      fse
        .move(sourceTest, destTest)
        .then(() => {
          ok(`Success: Component Test ${sourceTest} moved`);
        })
        .catch((err) => error(err));
    } else {
      warning(
        `WARNING: There are no integration tests for component ${componentName}`
      );
    }
  }
};
