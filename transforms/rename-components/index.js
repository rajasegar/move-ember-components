const { getParser } = require("codemod-cli").jscodeshift;
const { getOptions } = require("codemod-cli");

const recast = require("ember-template-recast");

function renameComponents(file, config) {
  return {
    MustacheStatement(node) {
      if (node.path.original === config.from) {
        node.path.original = config.to + "/" + node.path.original;
      }
    },
    BlockStatement(node) {
      if (node.path.original === config.from) {
        node.path.original = config.to + "/" + node.path.original;
      }
    },
  };
}

module.exports = function transformer(file, api) {
  const j = getParser(api);
  const options = getOptions();

  let { code } = recast.transform(file.source, () =>
    renameComponents(file, options)
  );

  return code;
};
