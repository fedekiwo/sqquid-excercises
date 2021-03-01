const { should, expect } = require("chai");
const Promise = require("bluebird");
const sinon = require("sinon");
const Cache = require("./cache");
should();

const { 
  cache : { 
    args1,
    args2,
    args3,
    args4,
    expected1,
    expected2,
    expected3,
    expected4
  }
} = require("../specHelpers/fixture");

const veryLongProcessMock = (arg1, arg2) => [arg1, arg2].join("-");
const sandbox = sinon.createSandbox();
let processWithCache = null;
let veryLongProcessSpy = null;

describe("FIFO Cache", () => {

  beforeEach(() => {
    veryLongProcessSpy = sandbox.spy(veryLongProcessMock);
    processWithCache = new Cache(veryLongProcessSpy, 3);
  });

  afterEach(() => {
    sandbox.restore();
  });

  const cacheSetUp = (argsList) => Promise.mapSeries(argsList, args => processWithCache.execute(...args), { concurrency: 1 });
  const cacheAssertion = (argsList, expectedResult, callCount) => cacheSetUp(argsList)
    .then(result => result.should.be.eql(expectedResult))
    .tap(() => veryLongProcessSpy.callCount.should.be.eql(callCount));

  it("should call only once the original process, when calling it twice with the same args", () => {
    return cacheAssertion([args1, args1], [expected1, expected1], 1);
  });

  it("should call twice the original process, when calling it twice with the different args", () => {
    return cacheAssertion([args1, args2], [expected1, expected2], 2);
  });

  context("when the cache reachs it's limit", () => {
    it("should remove entries with FIFO algorithm", () => {
      return cacheSetUp([args1, args2, args3])
      .tap(() => veryLongProcessSpy.resetHistory())
      .then(() => cacheAssertion([args4, args4], [expected4, expected4], 1))
      .tap(() => expect(processWithCache.get(args1)).to.be.a('null'));
    });

    it("should update the key's linked list position when it's accessed", () => {
      return cacheSetUp([args1, args2, args3])
      .tap(() => veryLongProcessSpy.resetHistory())
      .then(() => cacheAssertion([args1, args4, args4], [expected1, expected4, expected4], 1))
      .tap(() => expect(processWithCache.get(args2)).to.be.a('null'));
    });
  });


});