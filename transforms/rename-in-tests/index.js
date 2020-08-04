const { getParser } = require("codemod-cli").jscodeshift;
const { getOptions } = require("codemod-cli");

module.exports = function transformer(file, api) {
  const j = getParser(api);
  const options = getOptions();

  const root = j(file.source);

  root
    .find(j.TaggedTemplateExpression)
    .filter((path) => path.value.tag.name === "hbs")
    .forEach((path) => {
      const newQuasis = path.value.quasi.quasis.map((q) => {
        const raw = q.value.raw.replace(
          options.from,
          `${options.to}/${options.from}`
        );
        q.value.raw = raw;
        return q;
      });

      path.value.quasi.quasis = newQuasis;
    });

  return root.toSource();
};
