const { expect } = require("chai");

describe("example", function() {
  before(async () => {
    // any shared test state to setup?
  });

  it("test1", function() {
    let result = calc();
    expect(result).to.equal(1);
  });

  it("test2.async", async function() {
    let result = await asyncCalc();
    expect(result).to.equal(1);
  });

  after(async () => {
    // any cleanup?
  });
});

function calc() {
  return 1;
}

async function asyncCalc() {
  await sleep(10);
  return 1;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(1), ms);
  });
}
