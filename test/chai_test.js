const expect = require("chai").expect;
const myLib = require("../backend/app.js");


describe("isCorrect Test with Chai", () => {
  it("should return max", () => {
    let your_ans = '4';
    let correct_ans = '4';
    expect(myLib.isCorrect(your_ans,correct_ans)).to.equal(true);
  });
});