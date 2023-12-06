import {
  calculateMarginOfError,
  calculateMarginOfErrorPart2,
} from "../../src/day-6/desertIsland";

describe("Test desertIsland", () => {
  // it("example part assertion", async () => {
  //     const summatory = await calculateMinimumSeedLocationForAlmanac(
  //         "./tests/day-5/example",
  //     );
  //     expect(summatory).toEqual(35);
  // });
  it("first part assertion", async () => {
    const summatory = await calculateMarginOfError("./tests/day-6/input");
    expect(summatory).toEqual(2374848);
  });
  // it("second part example assertion", async () => {
  //     const summatory = await calculateMinimumSeedLocationForAlmanacPart2(
  //         "./tests/day-5/example",
  //     );
  //     expect(summatory).toEqual(46);
  // });
  it("second part assertion", async () => {
    const summatory = await calculateMarginOfErrorPart2("./tests/day-6/input");
    expect(summatory).toEqual(59370572);
  });
});
