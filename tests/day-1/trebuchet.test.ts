import { decodeKeyChain } from "../../src/day-1/trebuchet";
import { readLinesFromFile } from "../../src/util/readFileRowsAsArray";

describe("Test trebuchet", () => {
  it("array of five elements returns correct value", () => {
    const encoded = [
      "1aoisjdoi124",
      "1patata3",
      "patata123",
      "samita05",
      "osdkokooomsKKW9",
    ];
    expect(decodeKeyChain(encoded)).toEqual(144);
  });
  it("final assertion", async () => {
    const encoded = await readLinesFromFile("./tests/day-1/input");
    console.log(encoded);
    const decodedResult = decodeKeyChain(encoded);
    expect(decodedResult).toEqual(54597);
  });
  it("supports word numbers", () => {
    const encoded = [
      "two1nine",
      "eightwothree",
      "abcone2threexyz",
      "xtwone3four",
      "4nineeightseven2",
      "zoneight234",
      "7pqrstsixteen",
    ];
    expect(decodeKeyChain(encoded)).toEqual(281);
  });
  it("single", () => {
    const encoded = ["6tvxlgrsevenjvbxbfqrsk4seven"];
    expect(decodeKeyChain(encoded)).toEqual(281);
  });
  it("final assertion part 2", async () => {
    const encoded = await readLinesFromFile("./tests/day-1/secondInput");
    // console.log(encoded);
    const decodedResult = decodeKeyChain(encoded);
    expect(decodedResult).toEqual(54504);
  });
});
