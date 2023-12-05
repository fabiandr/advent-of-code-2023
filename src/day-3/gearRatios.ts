import { readLinesFromFile } from "../util/readFileRowsAsArray";

type Coordinate = {
  x: number;
  y: number;
};
type NumberWithCoordinates = {
  number: number;
  coordinates: Coordinate[];
};
type NumberWithCoordinatesAndAdjacentCoordinates = NumberWithCoordinates & {
  adjacentCoordinates: Coordinate[];
};
let fileLines: string[] | undefined;

const getFileLines = async (path: string): Promise<string[]> => {
  if (!fileLines) {
    fileLines = await readLinesFromFile(path);
  }
  return fileLines;
};
export const calculateGearRatios = async (path: string) => {
  const fileLines = await getFileLines(path);
  const numbersWithCoordinates = fileLines
    .map((line, index) => findNumberWithCoordinatesOnLine(line, index))
    .reduce((accumulator, value) => accumulator.concat(value), [])
    .map((numberWithCoordinates) => {
      const duplicateAdjacent = numberWithCoordinates.coordinates.map(
        (coordinate) => getAdjacentCoordinates(coordinate, fileLines),
      );
      const adjacentCoordinates = new Set<Coordinate>(
        duplicateAdjacent.flatMap((adjacent) => Array.from(adjacent)),
      );
      return {
        number: numberWithCoordinates.number,
        coordinates: numberWithCoordinates.coordinates,
        adjacentCoordinates: Array.from(adjacentCoordinates),
      } as NumberWithCoordinatesAndAdjacentCoordinates;
    })
    .filter((numberWithCoordinates) => {
      for (const coordinate of numberWithCoordinates.adjacentCoordinates) {
        const hasAdjacentSymbol = isAdjacentCoordinateASymbol(
          coordinate,
          fileLines,
        );
        if (hasAdjacentSymbol) {
          return true;
        }
      }
      return false;
    });
  return numbersWithCoordinates.reduce((a, b) => a + b.number, 0);
};

const findNumberWithCoordinatesOnLine = (
  line: string,
  row: number,
): NumberWithCoordinates[] => {
  const result: NumberWithCoordinates[] = [];
  let number = "";
  let coordinates: Coordinate[] = [];
  for (let col = 0; col < line.length; col++) {
    const char = line.charAt(col);
    if (!isNaN(Number(char))) {
      number = number + char;
      coordinates.push({ x: col, y: row });
    } else if (number !== "") {
      if (!isNaN(Number(number))) {
        result.push({ number: Number(number), coordinates });
      }
      number = "";
      coordinates = [];
    }
  }
  if (!isNaN(Number(number))) {
    result.push({ number: Number(number), coordinates });
  }
  return result;
};

const getAdjacentCoordinates = (
  coordinate: Coordinate,
  fileLines: string[],
): Set<Coordinate> => {
  const maxFileX = fileLines[coordinate.y].length - 1;
  const maxFileY = fileLines.length - 1;
  const coordinates = new Set<Coordinate>();
  const minX = coordinate.x - 1 < 0 ? 0 : coordinate.x - 1;
  const maxX = coordinate.x + 1 > maxFileX ? maxFileX : coordinate.x + 1;
  const minY = coordinate.y - 1 < 0 ? 0 : coordinate.y - 1;
  const maxY = coordinate.y + 1 > maxFileY ? maxFileY : coordinate.y + 1;
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      coordinates.add({ x, y });
    }
  }
  return coordinates;
};

const isAdjacentCoordinateASymbol = (
  coordinate: Coordinate,
  fileLines: string[],
): boolean => {
  const { x, y } = coordinate;
  const regex = /[^a-zA-Z0-9.]/;
  return regex.test(fileLines[y].charAt(x));
};

type GearWithCollidingNumbers = {
  gearCoordinates: Coordinate;
  numbers: NumberWithCoordinatesAndAdjacentCoordinates[];
};

export const calculateMultipliedGearRatios = async (path: string) => {
  const fileLines = await getFileLines(path);
  const numbersWithCoordinates = fileLines
    .map((line, index) => findNumberWithCoordinatesOnLine(line, index))
    .reduce((accumulator, value) => accumulator.concat(value), [])
    .map((numberWithCoordinates) => {
      const duplicateAdjacent = numberWithCoordinates.coordinates.map(
        (coordinate) => getAdjacentCoordinates(coordinate, fileLines),
      );
      const adjacentCoordinates = new Set<Coordinate>(
        duplicateAdjacent.flatMap((adjacent) => Array.from(adjacent)),
      );
      return {
        number: numberWithCoordinates.number,
        coordinates: numberWithCoordinates.coordinates,
        adjacentCoordinates: Array.from(adjacentCoordinates),
      } as NumberWithCoordinatesAndAdjacentCoordinates;
    });
  const gearsCoordinates = fileLines
    .map((line, index) => findGearCoordinates(line, index))
    .reduce((accumulator, value) => accumulator.concat(value), [])
    .map((gearCoordinate) =>
      findCollidingNumbers(gearCoordinate, numbersWithCoordinates),
    )
    .filter(
      (gearWithCollidingNumber) => gearWithCollidingNumber.numbers.length >= 2,
    );

  return gearsCoordinates.reduce(
    (a, b) => a + b.numbers.reduce((a, b) => a * b.number, 1),
    0,
  );
};
const findGearCoordinates = (line: string, row: number): Coordinate[] => {
  const result: Coordinate[] = [];
  for (let col = 0; col < line.length; col++) {
    const char = line.charAt(col);
    if (char === "*") {
      result.push({ x: col, y: row });
    }
  }
  return result;
};

const findCollidingNumbers = (
  coordinate: Coordinate,
  numberWithCoordinatesAndAdjacentCoordinates: NumberWithCoordinatesAndAdjacentCoordinates[],
): GearWithCollidingNumbers => {
  const numbers = numberWithCoordinatesAndAdjacentCoordinates.filter(
    (number) =>
      number.adjacentCoordinates.filter(
        (adjacentCoordinate) =>
          adjacentCoordinate.x === coordinate.x &&
          adjacentCoordinate.y === coordinate.y,
      ).length > 0,
  );

  return {
    gearCoordinates: coordinate,
    numbers,
  };
};
