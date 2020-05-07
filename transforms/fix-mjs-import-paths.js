// NOTE: cut-n-paste ../src/fix-mjs-import-paths/index.mjs into https://astexplorer.net/
const fs = require("fs");
const path = require("path");

const root = "/spike/prototype/AST/var-to-let/src/fix-mjs-import-paths";

function isDirectoryImport(importPath) {
  let fullPath = path.join(root, importPath);
  return fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory();
}

module.exports = function(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const updatedAnything =
    root
      .find(j.ImportDeclaration)
      .filter((x) => x.value.source.type === "Literal")
      .filter((x) => x.value.source.value.startsWith("."))
      .forEach((x) => {
        let importPath = x.value.source.value;
        if (isDirectoryImport(importPath)) {
          // console.log("directory import:", importPath);
          x.value.source.value = importPath + "/index.mjs";
        } else {
          if (!importPath.endsWith(".mjs")) {
            // console.log("extensionless import path:", importPath);
            x.value.source.value += ".mjs";
          }
        }
      })
      .size() !== 0;
  if (updatedAnything) {
    console.log("transformed:", file.path);
    return root.toSource();
  } else {
    console.log("no imports to transform:", file.path);
    return null;
  }
};
