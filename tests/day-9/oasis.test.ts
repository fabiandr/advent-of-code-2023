import {
  mirageMaintenancePart1,
  mirageMaintenancePart2,
} from "../../src/day-9/oasis";

describe("Test oasis", () => {
  it("example part assertion", async () => {
    const result = await mirageMaintenancePart1("./tests/day-9/example");
    expect(result).toEqual(114);
  });
  it("first part assertion", async () => {
    const result = await mirageMaintenancePart1("./tests/day-9/input");
    expect(result).toEqual(1696140818);
  });
  it("example second part assertion", async () => {
    const result = await mirageMaintenancePart2("./tests/day-9/example");
    expect(result).toEqual(2);
  });
  it("second part assertion", async () => {
    const result = await mirageMaintenancePart2("./tests/day-9/input");
    expect(result).toEqual(1152);
  });
});
