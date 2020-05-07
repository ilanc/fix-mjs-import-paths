const consoleLogger = require("../log/console");

module.exports = {
  spikeDebug: true,
  logger: consoleLogger,
  log: {
    host: "TODO.TEST",
    /* *
    levelFilter: {
      net: true,
      debug: false,
      info: false,
      warn: false,
      error: true,
      fatal: true
    },
    /* */
  },
};
