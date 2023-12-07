import { readLinesFromFile } from "../util/readFileRowsAsArray";

const helper = (play: string): Map<string, number> => {
  const cards = new Map<string, number>();
  let i = 5;
  while (i--) {
    const cardVal = play.charAt(i);
    const cardAmount = cards.get(cardVal) ?? 0;
    cards.set(cardVal, cardAmount + 1);
  }
  return cards;
};
const isFiveOfAKind = (play: string): boolean => {
  const checkedPlay = helper(play);
  return (
    checkedPlay.size === 1 ||
    (checkedPlay.size == 2 && checkedPlay.get("J") !== undefined)
  );
};
const isFourOfAKind = (play: string): boolean => {
  const checkedPlay = helper(play);
  if (checkedPlay.size === 2) {
    let isFourEqual = false;
    checkedPlay.forEach((val) => {
      if (val === 4) {
        isFourEqual = true;
      }
    });
    return isFourEqual;
  } else if (checkedPlay.size === 3 && checkedPlay.get("J") !== undefined) {
    const jValue = checkedPlay.get("J") || 0;
    let is = false;
    checkedPlay.forEach((val, key) => {
      if (val + jValue === 4) {
        is = true;
      }
    });
    return is;
  }
  return false;
};
const isFullHouse = (play: string): boolean => {
  const checkedPlay = helper(play);
  if (checkedPlay.size === 2) {
    let is = false;
    checkedPlay.forEach((val) => {
      if (val === 3) {
        is = true;
      }
    });
    return is;
  } else if (checkedPlay.size === 3 && checkedPlay.get("J") === 1) {
    return true;
  }
  return false;
};

const isThreeOfAKind = (play: string): boolean => {
  const checkedPlay = helper(play);
  if (checkedPlay.size === 3) {
    let is = false;
    checkedPlay.forEach((val) => {
      if (val === 3) {
        is = true;
      }
    });
    return is;
  } else if (checkedPlay.size === 4 && checkedPlay.get("J") !== undefined) {
    const jValue = checkedPlay.get("J") || 0;
    let is = false;
    checkedPlay.forEach((val, key) => {
      if (val + jValue === 3) {
        is = true;
      }
    });
    return is;
  }
  return false;
};
const isTwoPair = (play: string): boolean => {
  const checkedPlay = helper(play);
  if (checkedPlay.size === 3) {
    let is = true;
    checkedPlay.forEach((val) => {
      if (val === 3) {
        is = false;
      }
    });
    return is;
  } else if (checkedPlay.size === 4 && checkedPlay.get("J") === 1) {
    return true;
  }
  return false;
};
const isOnePair = (play: string): boolean => {
  const checkedPlay = helper(play);
  return (
    checkedPlay.size === 4 ||
    (checkedPlay.size === 5 && checkedPlay.get("J") === 1)
  );
};

const getCardValue = (card: string) => {
  if (isNaN(Number(card))) {
    // return CardFigure[card as keyof typeof CardFigure];
    // TODO: improve this:
    if (card === "A") {
      return "14";
    } else if (card === "K") {
      return "13";
    } else if (card === "Q") {
      return "12";
    } else if (card === "J") {
      return "01";
    } else if (card === "T") {
      return "10";
    } else {
      throw Error("Invalid card");
    }
  } else {
    const value = Number(card);
    if (value < 2 || value > 9) {
      throw Error("Invalid card");
    }
    return "0" + card;
  }
};

enum CamelCardHandStrength {
  FIVE_OF_A_KIND = "7",
  FOUR_OF_A_KIND = "6",
  FULL_HOUSE = "5",
  THREE_OF_A_KIND = "4",
  TWO_PAIR = "3",
  ONE_PAIR = "2",
  HIGH_CARD = "1",
}

const getCamelCardPlayStrength = (hand: string): CamelCardHandStrength => {
  if (isFiveOfAKind(hand)) {
    return CamelCardHandStrength.FIVE_OF_A_KIND;
  } else if (isFourOfAKind(hand)) {
    return CamelCardHandStrength.FOUR_OF_A_KIND;
  } else if (isFullHouse(hand)) {
    return CamelCardHandStrength.FULL_HOUSE;
  } else if (isThreeOfAKind(hand)) {
    return CamelCardHandStrength.THREE_OF_A_KIND;
  } else if (isTwoPair(hand)) {
    return CamelCardHandStrength.TWO_PAIR;
  } else if (isOnePair(hand)) {
    return CamelCardHandStrength.ONE_PAIR;
  } else {
    return CamelCardHandStrength.HIGH_CARD;
  }
};

type CamelCardPlay = {
  hand: string;
  bid: number;
};
const parseCamelCardPlays = async (path: string): Promise<CamelCardPlay[]> => {
  const lines = await readLinesFromFile(path);
  return lines.map((line) => {
    const parts = line.split(" ");
    const hand = parts[0];
    if (hand.length > 5) throw Error("Invalid hand length");
    if (isNaN(Number(parts[1]))) throw Error("Invalid bid");
    const bid = Number(parts[1]);

    return { hand, bid };
  });
};

type ValuedCamelCardPlay = CamelCardPlay & {
  handStrength: number;
};
const getCamelCardHandStrength = (play: CamelCardPlay): ValuedCamelCardPlay => {
  let handStrength = getCamelCardPlayStrength(play.hand).toString();
  for (let i = 0; i < 5; i++) {
    const card = play.hand.charAt(i);
    handStrength += getCardValue(card);
  }
  return {
    ...play,
    handStrength: Number(handStrength),
  };
};

export const camelCardsPart2 = async (path: string) => {
  const plays = await parseCamelCardPlays(path);
  return plays
    .map(getCamelCardHandStrength)
    .sort((a, b) => a.handStrength - b.handStrength)
    .reduce((a, b, idx) => a + b.bid * (idx + 1), 0);
};
