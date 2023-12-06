import {
  calculateMinimumSeedLocationForAlmanac,
  calculateMinimumSeedLocationForAlmanacPart2,
} from "../../src/day-5/almanac";

describe("Test gearRatios", () => {
  it("example part assertion", async () => {
    const summatory = await calculateMinimumSeedLocationForAlmanac(
      "./tests/day-5/example",
    );
    expect(summatory).toEqual(35);
  });
  it("first part assertion", async () => {
    const summatory = await calculateMinimumSeedLocationForAlmanac(
      "./tests/day-5/input",
    );
    expect(summatory).toEqual(806029445);
  });
  it("second part example assertion", async () => {
    const summatory = await calculateMinimumSeedLocationForAlmanacPart2(
      "./tests/day-5/example",
    );
    expect(summatory).toEqual(46);
  });
  it("second part assertion", async () => {
    const summatory = await calculateMinimumSeedLocationForAlmanacPart2(
      "./tests/day-5/input",
    );
    expect(summatory).toEqual(59370572);
  });
});
