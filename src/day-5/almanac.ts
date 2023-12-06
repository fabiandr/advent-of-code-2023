import { readFileAsString } from "../util/readFileRowsAsArray";

type AlmanacConversionMap = {
  destination: number;
  source: number;
  variation: number;
};

type Almanac = {
  seeds: number[];
  seedToSoils: AlmanacConversionMap[];
  soilToFertilizers: AlmanacConversionMap[];
  fertilizerToWaters: AlmanacConversionMap[];
  waterToLights: AlmanacConversionMap[];
  lightToTemperatures: AlmanacConversionMap[];
  temperatureToHumidities: AlmanacConversionMap[];
  humidityToLocations: AlmanacConversionMap[];
};

const parseAlmanac = async (path: string): Promise<Almanac> => {
  const file = await readFileAsString(path);

  const seedsRegex = /seeds:((\s+\d+)*)/;
  const seedsMatches = file.match(seedsRegex);

  if (!seedsMatches) {
    throw new Error("Invalid file format");
  }
  const seeds = seedsMatches[1].trim().split(" ");

  const seedToSoilRegex = /seed-to-soil map:\n((\d+\s+)*)/;
  const seedToSoilMatches = file.match(seedToSoilRegex);

  if (!seedToSoilMatches) {
    throw new Error("Invalid file format");
  }
  const seedToSoils = seedToSoilMatches[1]
    .trim()
    .split("\n")
    .map((seedToSoil) => seedToSoil.split(" "));

  const soilToFertilizerRegex = /soil-to-fertilizer map:\n((\d+\s+)*)/;
  const soilToFertilizerMatches = file.match(soilToFertilizerRegex);

  if (!soilToFertilizerMatches) {
    throw new Error("Invalid file format");
  }
  const soilToFertilizers = soilToFertilizerMatches[1]
    .trim()
    .split("\n")
    .map((soilToFertilizer) => soilToFertilizer.split(" "));

  // ---
  const fertilizerToWaterRegex = /fertilizer-to-water map:\n((\d+\s+)*)/;
  const fertilizerToWaterMatches = file.match(fertilizerToWaterRegex);

  if (!fertilizerToWaterMatches) {
    throw new Error("Invalid file format");
  }
  const fertilizerToWaters = fertilizerToWaterMatches[1]
    .trim()
    .split("\n")
    .map((fertilizerToWater) => fertilizerToWater.split(" "));

  // ---
  const waterToLightRegex = /water-to-light map:\n((\d+\s+)*)/;
  const waterToLightMatches = file.match(waterToLightRegex);

  if (!waterToLightMatches) {
    throw new Error("Invalid file format");
  }
  const waterToLights = waterToLightMatches[1]
    .trim()
    .split("\n")
    .map((waterToLight) => waterToLight.split(" "));

  // ---
  const lightToTemperatureRegex = /light-to-temperature map:\n((\d+\s+)*)/;
  const lightToTemperatureMatches = file.match(lightToTemperatureRegex);

  if (!lightToTemperatureMatches) {
    throw new Error("Invalid file format");
  }
  const lightToTemperatures = lightToTemperatureMatches[1]
    .trim()
    .split("\n")
    .map((lightToTemperature) => lightToTemperature.split(" "));

  // ---
  const temperatureToHumidityRegex =
    /temperature-to-humidity map:\n((\d+\s+)*)/;
  const temperatureToHumidityMatches = file.match(temperatureToHumidityRegex);

  if (!temperatureToHumidityMatches) {
    throw new Error("Invalid file format");
  }
  const temperatureToHumidities = temperatureToHumidityMatches[1]
    .trim()
    .split("\n")
    .map((temperatureToHumidity) => temperatureToHumidity.split(" "));

  // ---
  const humidityToLocationRegex = /humidity-to-location map:\n((\d+\s*)*)/;
  const humidityToLocationMatches = file.match(humidityToLocationRegex);

  if (!humidityToLocationMatches) {
    throw new Error("Invalid file format");
  }
  const humidityToLocations = humidityToLocationMatches[1]
    .trim()
    .split("\n")
    .map((humidityToLocation) => humidityToLocation.split(" "));

  return {
    seeds: seeds.map(Number),
    seedToSoils: seedToSoils.map((item) => {
      return {
        destination: Number(item[0]),
        source: Number(item[1]),
        variation: Number(item[2]),
      };
    }),
    soilToFertilizers: soilToFertilizers.map((item) => {
      return {
        destination: Number(item[0]),
        source: Number(item[1]),
        variation: Number(item[2]),
      };
    }),
    fertilizerToWaters: fertilizerToWaters.map((item) => {
      return {
        destination: Number(item[0]),
        source: Number(item[1]),
        variation: Number(item[2]),
      };
    }),
    waterToLights: waterToLights.map((item) => {
      return {
        destination: Number(item[0]),
        source: Number(item[1]),
        variation: Number(item[2]),
      };
    }),
    lightToTemperatures: lightToTemperatures.map((item) => {
      return {
        destination: Number(item[0]),
        source: Number(item[1]),
        variation: Number(item[2]),
      };
    }),
    temperatureToHumidities: temperatureToHumidities.map((item) => {
      return {
        destination: Number(item[0]),
        source: Number(item[1]),
        variation: Number(item[2]),
      };
    }),
    humidityToLocations: humidityToLocations.map((item) => {
      return {
        destination: Number(item[0]),
        source: Number(item[1]),
        variation: Number(item[2]),
      };
    }),
  };
};

export const calculateMinimumSeedLocationForAlmanac = async (path: string) => {
  const almanac = await parseAlmanac(path);
  const locations = almanac.seeds
    .map((seed) => {
      const soil = getConversion(seed, almanac.seedToSoils);
      const fertilizer = getConversion(soil, almanac.soilToFertilizers);
      const water = getConversion(fertilizer, almanac.fertilizerToWaters);
      const light = getConversion(water, almanac.waterToLights);
      const temperature = getConversion(light, almanac.lightToTemperatures);
      const humidity = getConversion(
        temperature,
        almanac.temperatureToHumidities,
      );
      return getConversion(humidity, almanac.humidityToLocations);
    })
    .sort((n1, n2) => n1 - n2);
  console.log("obtained locations", locations);

  return locations[0];
};

export const getConversion = (
  input: number,
  conversionMaps: AlmanacConversionMap[],
): number => {
  let result: number | undefined;
  for (let conversionMap of conversionMaps) {
    const { destination, source, variation } = conversionMap;
    if (source <= input && input < source + variation) {
      result = destination + input - source;
      break;
    }
  }
  if (result === undefined) {
    result = input;
  }
  return result;
};

export const parseRangedSeeds = (seeds: number[]): number[] => {
  const rangedSeeds: number[] = [];
  if (seeds.length % 2 !== 0) {
    throw new Error("wrong format");
  }
  for (let seedIndex = 0; seedIndex < seeds.length; seedIndex = seedIndex + 2) {
    const val = seeds[seedIndex];
    const variation = seeds[seedIndex + 1];
    for (let i = 0; i < variation; i++) {
      rangedSeeds.push(val + i);
    }
  }
  console.log(rangedSeeds.length);
  return rangedSeeds;
};
export const calculateMinimumSeedLocationForAlmanacPart2 = async (
  path: string,
) => {
  const almanac = await parseAlmanac(path);
  const { seeds } = almanac;
  let location: number | undefined = undefined;
  for (let seedIndex = 0; seedIndex < seeds.length; seedIndex = seedIndex + 2) {
    const val = seeds[seedIndex];
    const variation = seeds[seedIndex + 1];
    for (let i = 0; i < variation; i++) {
      const seed = val + i;
      const soil = getConversion(seed, almanac.seedToSoils);
      const fertilizer = getConversion(soil, almanac.soilToFertilizers);
      const water = getConversion(fertilizer, almanac.fertilizerToWaters);
      const light = getConversion(water, almanac.waterToLights);
      const temperature = getConversion(light, almanac.lightToTemperatures);
      const humidity = getConversion(
        temperature,
        almanac.temperatureToHumidities,
      );
      const tempLocation = getConversion(humidity, almanac.humidityToLocations);
      location =
        location === undefined || tempLocation < location
          ? tempLocation
          : location;
    }
  }
  return location;
};
