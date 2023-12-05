import { readLinesFromFile } from "../util/readFileRowsAsArray";

type Game = {
  number: number;
  winning: number[];
  plays: number[];
};

type GameWithScore = Game & {
  score: number;
};

const parseLine = (line: string): Game => {
  const gameRegex = /^Card\s+(\d+):\s+(.+)\|(.+)$/;

  const match = line.match(gameRegex);

  if (!match || match.length !== 4) {
    throw new Error("Invalid line format");
  }

  const gameNumber = match[1];
  const winning = match[2];
  const plays = match[3];

  return {
    number: Number(gameNumber),
    winning: winning
      .trim()
      .split(" ")
      .filter((str) => str.trim() != "")
      .map(Number),
    plays: plays
      .trim()
      .split(" ")
      .filter((str) => str.trim() != "")
      .map(Number),
  };
};

export const scratchCards = async (path: string) => {
  const fileLines = await readLinesFromFile(path);
  return fileLines
    .map(parseLine)
    .map(calculateGameScore)
    .reduce((a, b) => a + b.score, 0);
};

export const calculateGameScore = (game: Game): GameWithScore => {
  const score = game.plays
    .filter((play) => game.winning.includes(play))
    .reduce((a, b) => a * 2, 1);

  return {
    ...game,
    score: score > 1 ? score / 2 : 0,
  };
};

type GamePlayTimes = {
  number: number;
  count: number;
};
export const scratchCardsV2 = async (path: string) => {
  const games = (await readLinesFromFile(path)).map(parseLine);
  const gamePlayTimes = new Map<number, number>();
  games.map((game) => {
    gamePlayTimes.set(game.number, 1);
  });
  games.map((game) => {
    const matches = calculateGameMatches(game);
    const currentGameValue = gamePlayTimes.get(game.number) ?? 1;
    // console.log(
    //   `game: ${game.number} has ${matches} matches and currentGameValue of ${currentGameValue}`,
    // );
    for (let i = 1; i <= matches; i++) {
      const affectedGameNumber = game.number + i;
      let value =
        (gamePlayTimes.get(affectedGameNumber) ?? 1) + currentGameValue;
      // console.log(`setting new value for ${affectedGameNumber} -> ${value}`);
      gamePlayTimes.set(affectedGameNumber, value);
    }
  });

  let gamesPlayed = 0;
  gamePlayTimes.forEach((v) => (gamesPlayed += v));
  return gamesPlayed;
};
export const calculateGameMatches = (game: Game): number => {
  return game.plays.filter((play) => game.winning.includes(play)).length;
};
