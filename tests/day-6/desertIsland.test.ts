import {
  calculateMarginOfError,
  calculateMarginOfErrorPart2,
} from "../../src/day-6/desertIsland";

describe("Test desertIsland", () => {
  it("first part assertion", async () => {
    const summatory = await calculateMarginOfError("./tests/day-6/input");
    expect(summatory).toEqual(2374848);
  });
  it("second part assertion", async () => {
    const summatory = await calculateMarginOfErrorPart2("./tests/day-6/input");
    expect(summatory).toEqual(59370572);
  });
});
