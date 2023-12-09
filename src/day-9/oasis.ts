import { readLinesFromFile } from "../util/readFileRowsAsArray";

const parseLine = (line: string): number[] => {
  return line.split(" ").map(Number);
};
const isAllZero = (numbers: number[]): boolean => {
  return numbers.every((num) => num === 0);
};

const getIncrementalMatrix = (numbers: number[]): number[][] => {
  const result: number[][] = [numbers];
  let startingPoint = 1;
  let progression: number[] = numbers;
  while (!isAllZero(progression)) {
    const tempNumbers: number[] = [];
    for (let idx = 0; idx < startingPoint; idx++) {
      tempNumbers.push(0);
    }
    for (let idx = startingPoint; idx < progression.length; idx++) {
      const current = progression[idx];
      const previous = progression[idx - 1];
      tempNumbers.push(current - previous);
    }
    result.push(tempNumbers);
    progression = tempNumbers;
    startingPoint++;
    setTimeout(() => {
      console.log(`step ${startingPoint}`);
    }, 1000);
  }
  return result;
};

const getNextCalculatedElement = (matrix: number[][]): number => {
  return matrix.reduce((a, b) => a + b[b.length - 1], 0);
};

const getPreviousCalculatedElement = (matrix: number[][]): number => {
  let current = matrix.length - 2;
  let result: number | undefined;
  while (current >= 0) {
    const val = matrix[current][current] - matrix[current + 1][current];
    if (current === 0) {
      result = val;
    } else {
      matrix[current][current - 1] = val;
    }
    current--;
  }
  if (result === undefined) {
    throw new Error("failed to get previous value");
  }
  return result;
};

export const mirageMaintenancePart1 = async (path: string): Promise<number> => {
  const lines = await readLinesFromFile(path);
  return lines
    .map((line) => {
      const numbers = parseLine(line);
      const matrix = getIncrementalMatrix(numbers);
      return getNextCalculatedElement(matrix);
    })
    .reduce((a, b) => a + b, 0);
};

export const mirageMaintenancePart2 = async (path: string): Promise<number> => {
  const lines = await readLinesFromFile(path);
  return lines
    .map((line) => {
      const numbers = parseLine(line);
      const matrix = getIncrementalMatrix(numbers);
      const number = getPreviousCalculatedElement(matrix);
      return number;
    })
    .reduce((a, b) => a + b, 0);
};
