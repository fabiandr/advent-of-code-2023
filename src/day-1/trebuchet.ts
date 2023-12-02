type NumberPosition = {
  number: number;
  index: number;
};

export const decodeKeyChain = (keyChain: string[]) => {
  return keyChain.map(decodeKey).reduce((a, b) => a + b, 0);
};

const getExplicitNumbers = (key: string): NumberPosition[] => {
  const numbers: NumberPosition[] = [];
  Array.from(key).forEach((char, index) => {
    if (!isNaN(Number(char))) {
      numbers.push({ number: Number(char), index });
    }
  });
  return numbers;
};

const getTextNumbers = (key: string): NumberPosition[] => {
  const numbers: NumberPosition[] = [];
  getNumberDictionary().forEach((val, k) => {
    let index = key.indexOf(k);

    while (index !== -1) {
      numbers.push({ number: val, index });
      index = key.indexOf(k, index + 1);
    }
  });
  return numbers;
};

const decodeKey = (key: string): number => {
  const numbers = [...getExplicitNumbers(key), ...getTextNumbers(key)];
  const numericKey = numbers
    .sort((a, b) => (a.index < b.index ? -1 : 1))
    .reduce((a, b) => a + b.number, "");

  return Number(
    numericKey.charAt(0) + numericKey.charAt(numericKey.length - 1),
  );
};

let numberDictionary: Map<string, number> | undefined;
const initNumberDictionary = () => {
  numberDictionary = new Map<string, number>();
  numberDictionary.set("zero", 0);
  numberDictionary.set("one", 1);
  numberDictionary.set("two", 2);
  numberDictionary.set("three", 3);
  numberDictionary.set("four", 4);
  numberDictionary.set("five", 5);
  numberDictionary.set("six", 6);
  numberDictionary.set("seven", 7);
  numberDictionary.set("eight", 8);
  numberDictionary.set("nine", 9);
  numberDictionary.set("ten", 10);
  numberDictionary.set("eleven", 11);
  numberDictionary.set("twelve", 12);
  numberDictionary.set("thirteen", 13);
  numberDictionary.set("fourteen", 14);
  numberDictionary.set("fifteen", 15);
  numberDictionary.set("sixteen", 16);
  numberDictionary.set("seventeen", 17);
  numberDictionary.set("eighteen", 18);
  numberDictionary.set("nineteen", 19);
  numberDictionary.set("twenty", 20);
  return numberDictionary;
};
const getNumberDictionary = () => {
  if (numberDictionary) {
    return numberDictionary;
  }
  return initNumberDictionary();
};
