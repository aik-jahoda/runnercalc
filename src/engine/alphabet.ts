import * as diacritics from 'diacritics'
import { reduceNumber } from './tools';

const alphabetMatrix: { [name: string]: number | undefined } = {
    A: 1, J: 1, S: 1,
    B: 2, K: 2, T: 2,
    C: 3, L: 3, U: 3,
    D: 4, M: 4, V: 4,
    E: 5, Ö: 5, N: 5, W: 5,
    F: 6, O: 6, X: 6,
    G: 7, P: 7, Y: 7,
    H: 8, Q: 8, Z: 8,
    I: 9, Ü: 9, R: 9
}

function getNumberFromAlphabet(ch: string) {
    return alphabetMatrix[ch] || alphabetMatrix[diacritics.remove(ch)] || 0;
}

export function getNumberFromText(name: string) {
    name = name.toUpperCase();
    let rawNumber = 0
    for (let ch of name) {
        rawNumber += getNumberFromAlphabet(ch);
    }

    const initialLetterNumber = name.length > 0 ? getNumberFromAlphabet(name[0]) : 0;

    return {
        reducedNumber: reduceNumber(rawNumber), rawNumber, initialLetterNumber
    }
}