import lodashMerge from "lodash/merge";

export function example(obj) {
  let o = lodashMerge({ a: 1 }, obj);
  console.log("lodashUser", JSON.stringify(o, null, 2));
}
