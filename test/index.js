const appInit = require("./init");
const Config = require("./config/index");

//#region init

describe("init", () => {
  it("all", async function() {
    await init();
  });
});

//#endregion

//#region your tests here

// TODO
require("./example");

//#endregion

//#region shutdown

describe("shutdown", () => {
  it("all", async function() {
    await shutdown();
  });
});

function isQuiet(args) {
  for (let i = 0; i < args.length; ++i) {
    let arg = args[i];
    if (arg == "--quiet") {
      let val = bool(args[i + 1]);
      return val;
    }
  }
  return true; // quiet by default
}

function bool(s) {
  let v = s.toLowerCase();
  if (["yes", "true", "t", "y", "1"].includes(v)) return true;
  else if (["no", "false", "f", "n", "0"].includes(v)) return false;
  else throw "invalid bool";
}

async function init() {
  // console.log("init app");
  // console.log(process.argv);
  // mocha adds it's own args --no-config, --no-package etc...
  let configName = isQuiet(process.argv) ? "quiet" : "verbose";
  if (!Config.checkConfig(configName)) {
    process.exit(-1);
  }
  await appInit.init(Config[configName]);
}

async function shutdown() {
  // console.log("shutdown app");
  await appInit.shutdown();
}

//#endregion
