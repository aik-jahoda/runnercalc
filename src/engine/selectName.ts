import { woman } from "./names";
import { NameNumerology } from "./numerologyName";
import { getMessage, MessageType } from "./numberExplanation";

function* nameGenerator(surname: string, secondName: boolean) {
    for (const name of woman) {
        yield [name, surname];
    }
    if (secondName) {
        for (const name of woman) {
            for (const name2 of woman) {
                yield [name, name2, surname];
            }
        }
    }
}

export function getNames(maximumNegative: number, minimumPositive: number, surname: string, secondName: boolean) {

    const names = [];
    for (const name of nameGenerator(surname, secondName)) {
        const result = NameNumerology.analyse(name);

        const importantNumbers = [result.firstCoordinate, result.secondCoordinate, result.thirdCoordinate];
        const importantTypes = importantNumbers.map(number => getMessage(number).type);


        if (importantTypes.filter(type => type === MessageType.positive).length >= minimumPositive &&
            importantTypes.filter(type => type === MessageType.negative).length <= maximumNegative) {
            names.push(name);
        }
    }
    return names;

}