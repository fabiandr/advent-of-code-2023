import { camelCardsPart1 } from "../../src/day-7/camelCards";
import { camelCardsPart2 } from "../../src/day-7/camelCardsPart2";

describe("Test camelCards", () => {
  it("example part assertion", async () => {
    const result = await camelCardsPart1("./tests/day-7/example");
    expect(result).toEqual(6440);
  });
  it("first part assertion", async () => {
    const result = await camelCardsPart1("./tests/day-7/input");
    expect(result).toEqual(249483956);
  });
  it("example second part assertion", async () => {
    const result = await camelCardsPart2("./tests/day-7/example");
    expect(result).toEqual(5905);
  });
  it("second part assertion", async () => {
    const result = await camelCardsPart2("./tests/day-7/input");
    expect(result).toEqual(252137472);
  });
});
