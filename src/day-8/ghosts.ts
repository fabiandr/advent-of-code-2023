import { readLinesFromFile } from "../util/readFileRowsAsArray";

type Node = {
  L: string;
  R: string;
};
type GhostNodes = {
  pattern: string;
  nodes: Map<string, Node>;
};

const PART_1_WINNING_REGEX = /Z{3}/;
const PART_2_WINNING_REGEX = /\w{2}Z/;
const PART_2_STARTING_REGEX = /\w{2}A/;

let winningRegex: RegExp | undefined;

const parseInputFile = async (path: string): Promise<GhostNodes> => {
  const lines = await readLinesFromFile(path);
  let pattern = "";

  const nodes = new Map<string, Node>();
  lines.forEach((line, index) => {
    if (line.trim().length === 0) {
      // do nothing
    } else if (index === 0) {
      pattern = parsePattern(line);
    } else {
      const { root, L, R } = parseNode(line);
      nodes.set(root, { L, R });
    }
  });

  return {
    pattern,
    nodes,
  };
};
const parsePattern = (line: string): string => {
  const patternRegex = /(\w*)/;
  const match = line.match(patternRegex);
  if (!match || match?.length === 0) throw "Pattern not found";
  return match[0];
};
const parseNode = (line: string) => {
  const patternRegex = /(\w{3}) = \((\w{3}), (\w{3})\)/;
  const match = line.match(patternRegex);
  if (!match || match?.length === 0) throw "Nodes not found";

  return {
    root: match[1],
    L: match[2],
    R: match[3],
  };
};

const isWinningPlay = (key: string) => {
  if (!winningRegex) {
    throw new Error("WinningRegex not set");
  }
  return key.match(winningRegex);
};

type CycleResult = {
  endKey: string;
  stepCount: number;
};

const runFullCycle = (
  pattern: string,
  nodes: Map<string, Node>,
  startKey: string,
): CycleResult => {
  let key = startKey;
  let stepCount = 0;
  for (let direction of pattern) {
    const node = nodes.get(key);
    if (!node) {
      throw new Error(`Invalid direction ${key}`);
    }
    stepCount++;
    key = direction === "L" ? node.L : node.R;
    if (isWinningPlay(key)) {
      break;
    }
  }
  return {
    endKey: key,
    stepCount,
  };
};

export const findPathPart1 = async (path: string): Promise<number> => {
  winningRegex = PART_1_WINNING_REGEX;
  const ghostNodes = await parseInputFile(path);
  let key = "AAA";
  let stepCount = 0;
  while (!isWinningPlay(key)) {
    const cycleResult = runFullCycle(ghostNodes.pattern, ghostNodes.nodes, key);
    key = cycleResult.endKey;
    stepCount += cycleResult.stepCount;
  }
  return stepCount;
};

const findStartingKeys = (keys: string[]): string[] => {
  return keys.filter((key) => key.match(PART_2_STARTING_REGEX));
};

const getLowestPrimeDivider = (num: number): number => {
  const sqrt = Math.sqrt(num);

  for (let i = 2; i <= sqrt; i++) {
    const div = num / i;
    if (Math.floor(div) === div) {
      return i;
    }
  }
  return num;
};

const getPrimeDividers = (num: number): number[] => {
  const next = getLowestPrimeDivider(num);

  if (next === num) {
    return [num];
  }
  return [next, ...getPrimeDividers(num / next)];
};

export const findPathPart2 = async (path: string): Promise<number> => {
  winningRegex = PART_2_WINNING_REGEX;
  const ghostNodes = await parseInputFile(path);
  let keys = findStartingKeys([...ghostNodes.nodes.keys()]);
  const stepCounts = keys.map((key) => {
    let stepCount = 0;
    while (!isWinningPlay(key)) {
      const cycleResult = runFullCycle(
        ghostNodes.pattern,
        ghostNodes.nodes,
        key,
      );
      key = cycleResult.endKey;
      stepCount += cycleResult.stepCount;
    }
    return stepCount;
  });
  return [...new Set(stepCounts.flatMap(getPrimeDividers))].reduce(
    (a, c) => a * c,
  );
};
