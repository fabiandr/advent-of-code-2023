import { readFileAsString } from "../util/readFileRowsAsArray";

type Race = {
  time: number;
  distance: number;
};

const parseRaces = async (path: string): Promise<Race[]> => {
  const file = await readFileAsString(path);

  const timesRegex = /Time:((\s+\d+)*)/;
  const timesMatches = file.match(timesRegex);

  if (!timesMatches) {
    throw new Error("Invalid file format");
  }
  const times = timesMatches[1]
    .trim()
    .split(" ")
    .filter((time) => time !== "");

  const distanceRegex = /Distance:((\s+\d+)*)/;
  const distanceMatches = file.match(distanceRegex);

  if (!distanceMatches) {
    throw new Error("Invalid file format");
  }
  const distances = distanceMatches[1]
    .trim()
    .split(" ")
    .filter((time) => time !== "");

  if (distances.length != times.length) {
    throw new Error("Invalid file format");
  }

  const races: Race[] = [];
  for (let index = 0; index < distances.length; index++) {
    races.push({
      time: Number(times[index]),
      distance: Number(distances[index]),
    });
  }
  return races;
};
const parseRace = async (path: string): Promise<Race> => {
  const file = await readFileAsString(path);

  const timesRegex = /Time:((\s+\d+)*)/;
  const timesMatches = file.match(timesRegex);

  if (!timesMatches) {
    throw new Error("Invalid file format");
  }
  const time = timesMatches[1].replace(/\s/g, "");

  const distanceRegex = /Distance:((\s+\d+)*)/;
  const distanceMatches = file.match(distanceRegex);

  if (!distanceMatches) {
    throw new Error("Invalid file format");
  }
  const distance = distanceMatches[1].replace(/\s/g, "");

  return { time: Number(time), distance: Number(distance) };
};

const calcPossibleWinningPlays = (race: Race): number => {
  const { time, distance } = race;
  let winningPlaysCount = 0;
  for (let i = 0; i < time; i++) {
    const tempDistance = (time - i) * i;
    if (tempDistance > distance) {
      winningPlaysCount++;
    }
  }
  return winningPlaysCount;
};

export const calculateMarginOfError = async (path: string): Promise<number> => {
  const races = await parseRaces(path);
  return races.map(calcPossibleWinningPlays).reduce((a, b) => a * b, 1);
};

export const calculateMarginOfErrorPart2 = async (
  path: string,
): Promise<number> => {
  const race = await parseRace(path);
  return calcPossibleWinningPlays(race);
};
