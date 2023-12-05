import {
  calculateGearRatios,
  calculateMultipliedGearRatios,
} from "../../src/day-3/gearRatios";

describe("Test gearRatios", () => {
  it("example part assertion", async () => {
    const summatory = await calculateGearRatios("./tests/day-3/example");
    expect(summatory).toEqual(4361);
  });
  it("first part assertion", async () => {
    const summatory = await calculateGearRatios("./tests/day-3/input");
    expect(summatory).toEqual(554003);
  });
  it("second part example assertion", async () => {
    const summatory = await calculateMultipliedGearRatios(
      "./tests/day-3/example",
    );
    expect(summatory).toEqual(467835);
  });
  it("second part assertion", async () => {
    const summatory = await calculateMultipliedGearRatios(
      "./tests/day-3/input",
    );
    expect(summatory).toEqual(72970);
  });
});
