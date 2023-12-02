import { decodeKeyChain } from "../../src/day-1/trebuchet";

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
  it("array of five elements returns correct value", () => {
    const encoded = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];
    expect(decodeKeyChain(encoded)).toEqual(142);
  });
  it("throws error on empty string", () => {
    const encoded = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", ""];
    expect(() => decodeKeyChain(encoded)).toThrow("Received invalid key");
  });
  it("throws error on string without numbers", () => {
    const encoded = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "qwerty"];
    expect(() => decodeKeyChain(encoded)).toThrow("Received invalid key");
  });
});
