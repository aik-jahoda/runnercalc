import { getNumberFromText, TextDescription } from "./alphabet";
import { reduceNumber, reducePartial } from "./tools";

export type NameBreakDown = { name: string; } & TextDescription

export class NameNumerology {

    static analyse(names: string[]) {
        const nameNumbers: NameBreakDown[] = names.map((name) => ({ ...getNumberFromText(name), name }));
        const destinyNumber = nameNumbers.map(number => number.initialLetterNumber)
            .reduce((previous, current) => previous + current, 0);
        const firstCoordinate = nameNumbers.map(number => number.rawNumber)
            .reduce((previous, current) => previous + current, 0);
        const secondCoordinate = destinyNumber + firstCoordinate;
        const thirdCoordinate = firstCoordinate + names.length * destinyNumber;

        const west = nameNumbers.length > 0 ? nameNumbers[0].reducedNumber : 0;
        const east = nameNumbers.length > 1 ? nameNumbers[nameNumbers.length - 1].reducedNumber : 0;
        const south = reduceNumber(thirdCoordinate);

        const reducedEatWest = west + east;
        const reducedNorthSouth = south + destinyNumber;
        const main = reducedEatWest + reducedNorthSouth;

        return {
            nameNumbers,
            destinyNumber,
            firstCoordinate,
            secondCoordinate,
            thirdCoordinate,
            west,
            east,
            south,
            reducedEatWest,
            reducedNorthSouth,
            main
        }
    }

}