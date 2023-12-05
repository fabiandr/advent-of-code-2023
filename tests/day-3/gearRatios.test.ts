import { calculateGearRatios } from "../../src/day-3/gearRatios";

describe("Test gearRatios", () => {
  it("example part assertion", async () => {
    const summatory = await calculateGearRatios("./tests/day-3/example");
    expect(summatory).toEqual(4361);
  });
  it("first part assertion", async () => {
    const summatory = await calculateGearRatios("./tests/day-3/input");
    expect(summatory).toEqual(554003);
  });
  // it("second part assertion", async () => {
  //   const summatory = await calculateMinimalTotalValue("./tests/day-2/input");
  //   expect(summatory).toEqual(72970);
  // });
});
