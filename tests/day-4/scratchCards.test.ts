import { scratchCards, scratchCardsV2 } from "../../src/day-4/scratchcards";

describe("Test gearRatios", () => {
  it("example part assertion", async () => {
    const summatory = await scratchCards("./tests/day-4/example");
    expect(summatory).toEqual(13);
  });
  it("first part assertion", async () => {
    const summatory = await scratchCards("./tests/day-4/input");
    expect(summatory).toEqual(26914);
  });
  it("second part example assertion", async () => {
    const summatory = await scratchCardsV2("./tests/day-4/example");
    expect(summatory).toEqual(30);
  });
  it("second part assertion", async () => {
    const summatory = await scratchCardsV2("./tests/day-4/input");
    expect(summatory).toEqual(13080971);
  });
});
