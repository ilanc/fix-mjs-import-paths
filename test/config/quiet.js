const parent = require("./verbose");

module.exports = Object.assign({}, parent, {
  log: {
    /* */
    levelFilter: {
      net: false,
      debug: false,
      info: false,
      warn: false,
      error: true,
      fatal: true,
      alertWarn: false,
      alertError: false,
      scrape: false,
      screen: false,
      step: false,
    },
    quiet: true,
  },
});
