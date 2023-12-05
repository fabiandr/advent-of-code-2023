import { readLinesFromFile } from "../util/readFileRowsAsArray";

export enum Color {
  BLUE = "blue",
  RED = "red",
  GREEN = "green",
}
type GameRecord = {
  color: Color;
  amount: number;
};
type Game = {
  name: string;
  value: number;
  records: GameRecord[];
};
type BagContent = {
  content: Map<Color, number>;
};

const parseLine = (line: string): Game => {
  const gameRegex = /^Game (\d+): (.+)$/;

  const match = line.match(gameRegex);

  if (!match || match.length !== 3) {
    throw new Error("Invalid line format");
  }

  const gameNumber = match[1];
  const recordsString = match[2];

  const records: GameRecord[] = [];

  const recordRegex = /(\d+) (\w+)/g;
  let recordMatch;

  while ((recordMatch = recordRegex.exec(recordsString)) !== null) {
    const amount = parseInt(recordMatch[1], 10);
    const color = recordMatch[2];

    records.push({ color: <Color>color, amount });
  }

  return {
    name: `Game ${gameNumber}`,
    value: Number(gameNumber),
    records,
  };
};

const initPossibleGames = async (path: string) => {
  const fileLines = await readLinesFromFile(path);
  return fileLines.map(parseLine);
};

export const checkBagContentViability = async (
  bagContent: BagContent,
  path: string,
) => {
  const possibleGames = (await initPossibleGames(path)).map(asSimplifiedGame);
  return possibleGames
    .map((game) => {
      return checkGameViability(game, bagContent);
    })
    .reduce((a, b) => a + b, 0);
};

type SimplifiedGame = Omit<Game, "records"> & {
  simplifiedRecords: Map<Color, number>;
};
const asSimplifiedGame = (game: Game): SimplifiedGame => {
  const simplifiedRecords = new Map<Color, number>();
  game.records.map((record) => {
    let amount = simplifiedRecords.get(record.color) ?? 0;
    if (record.amount > amount) {
      simplifiedRecords.set(record.color, record.amount);
    }
  });

  return {
    name: game.name,
    value: game.value,
    simplifiedRecords,
  };
};

const checkGameViability = (
  simplifiedGame: SimplifiedGame,
  bagContent: BagContent,
): number => {
  let isViable = true;
  simplifiedGame.simplifiedRecords.forEach((v, k) => {
    isViable = isViable && (bagContent.content.get(k) ?? 0) >= v;
  });
  return isViable ? simplifiedGame.value : 0;
};

const calculateMinimalGameValue = (simplifiedGame: SimplifiedGame): number => {
  let value = 1;
  simplifiedGame.simplifiedRecords.forEach((v) => (value = value * v));
  return value;
};

export const calculateMinimalTotalValue = async (path: string) => {
  const possibleGames = (await initPossibleGames(path)).map(asSimplifiedGame);
  return possibleGames
    .map(calculateMinimalGameValue)
    .reduce((a, b) => a + b, 0);
};
