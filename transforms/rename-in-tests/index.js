const { getParser } = require("codemod-cli").jscodeshift;
const { getOptions } = require("codemod-cli");

module.exports = function transformer(file, api) {
  const j = getParser(api);
  const options = getOptions();

  const root = j(file.source);

  const newString = `${options.to}/${options.from}`;

  // Replacing in hbs`` tagged template literals
  root
    .find(j.TaggedTemplateExpression)
    .filter((path) => path.value.tag.name === "hbs")
    .forEach((path) => {
      const newQuasis = path.value.quasi.quasis.map((q) => {
        const raw = q.value.raw.replace(options.from, newString);
        q.value.raw = raw;
        return q;
      });

      path.value.quasi.quasis = newQuasis;
    });

  // Replacing literal values
  root
    .find(j.Literal)
    .filter((path) => typeof path.value.value === "string")
    .forEach((path) => {
      path.value.value = path.value.value.replace(options.from, newString);
    });

  return root.toSource();
};
