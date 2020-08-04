const recast = require("ember-template-recast");

function renameComponents(file, config) {
  return {
    MustacheStatement(node) {
      //node.path.original = "module-test/" + node.path.original;
    },
    BlockStatement(node) {
      //node.path.original = "module-test/" + node.path.original;
    },
  };
}
module.exports = function transform(file, config) {
  console.log(config);
  let { code } = recast.transform(fileInfo.source, () =>
    transformToAngleBracket(fileInfo, config, invokableData)
  );

  return code;
};
