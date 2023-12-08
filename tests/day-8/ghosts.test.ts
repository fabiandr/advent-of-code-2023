import { findPathPart1, findPathPart2 } from "../../src/day-8/ghosts";

describe("Test ghosts", () => {
  it("example part assertion", async () => {
    const result = await findPathPart1("./tests/day-8/example");
    expect(result).toEqual(6);
  });
  it("first part assertion", async () => {
    const result = await findPathPart1("./tests/day-8/input");
    expect(result).toEqual(20093);
  });
  it("example second part assertion", async () => {
    const result = await findPathPart2("./tests/day-8/examplePart2");
    expect(result).toEqual(6);
  });
  it("second part assertion", async () => {
    const result = await findPathPart2("./tests/day-8/input");
    expect(result).toEqual(22103062509257);
  });
});
