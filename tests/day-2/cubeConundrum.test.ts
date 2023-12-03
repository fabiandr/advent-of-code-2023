import {
  calculateMinimalTotalValue,
  checkBagContentViability,
  Color,
} from "../../src/day-2/cubeConundrum";

describe("Test cubeConundrum", () => {
  it("first part assertion", async () => {
    /*
    Determine which games would have been possible if the bag had been loaded with
    only 12 red cubes, 13 green cubes, and 14 blue cubes.
     What is the sum of the IDs of those games?
     */
    const bagContent = new Map<Color, number>();
    bagContent.set(Color.RED, 12);
    bagContent.set(Color.GREEN, 13);
    bagContent.set(Color.BLUE, 14);
    const summatory = await checkBagContentViability(
      { content: bagContent },
      "./tests/day-2/input",
    );
    expect(summatory).toEqual(3099);
  });
  it("second part assertion", async () => {
    const summatory = await calculateMinimalTotalValue("./tests/day-2/input");
    expect(summatory).toEqual(72970);
  });
});
