const { should } = require("chai");
const fuzzySearch = require("./fuzzySearch");
const { fuzzySearch: { record1, record2, record3, records } } = require("../specHelpers/fixture");
should();

function fuzzySearchResultAssertion(args, expected) {
  return fuzzySearch(...args).should.be.eql(expected);
}

describe("Fuzzy Search", () => {
  
  context("should return []", () => {
    it("When records array is empty", () => fuzzySearchResultAssertion(["test", []], []));
  
    it("When string to search is empty", () => fuzzySearchResultAssertion(["", records], []));

    it("When string to search is null", () => fuzzySearchResultAssertion([null, records], []));
  });

  context("should return all the records that fuzzy matches ordered", () => {
    it("when trying with string test", () => fuzzySearchResultAssertion(["test", [record2, record3, record1]], [record1, record2, record3]));
    
    it("even with different casings and spaces", () => fuzzySearchResultAssertion(["notca sesensitive", records], [record2]));
  });



});

