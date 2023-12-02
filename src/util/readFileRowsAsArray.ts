import * as fs from "fs";

export const readLinesFromFile = async (
  filePath: string,
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const lines = data.split("\n");
      resolve(lines);
    });
  });
};
