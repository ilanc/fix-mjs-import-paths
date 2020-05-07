import path from "path"; // bare import
import defaultDep from "./defaultDep"; // extensionless default import
import * as namedDep from "./namedDep"; // extensionless named import
import folderIndex from "./folder"; // folder index i.e. folder/index.mjs
import lo from "./lodashUser"; // folder index i.e. folder/index.mjs

console.log("path.sep", path.sep);
console.log("defaultDep", JSON.stringify(defaultDep));
console.log("namedDep", JSON.stringify(namedDep));
folderIndex.a.example();
folderIndex.b.example();
lo.example({ b: 2 });
