// https://eslint.org/docs/user-guide/configuring
// https://thomlom.dev/setup-eslint-prettier-react/
// https://egghead.io/lessons/eslint-avoid-common-javascript-errors-with-eslint
// https://www.freecodecamp.org/news/integrating-prettier-with-eslint-and-stylelint-99e74fede33f/
module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {},
  globals: {
    log: "readonly",
    cliLog: "readonly",
  },
};
