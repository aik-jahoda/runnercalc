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
    I: 9, Ü: 9, R: 9,
    //
    a: 1, j: 1, s: 1,
    b: 2, k: 2, t: 2,
    c: 3, l: 3, u: 3,
    d: 4, m: 4, v: 4,
    e: 5, ö: 5, n: 5, w: 5,
    f: 6, o: 6, x: 6,
    g: 7, p: 7, y: 7,
    h: 8, q: 8, z: 8,
    i: 9, ü: 9, r: 9
}

function getNumberFromAlphabet(ch: string) {
    return alphabetMatrix[ch] || alphabetMatrix[diacritics.remove(ch)] || 0;
}

const cache = new Map<string, TextDescription>();

export interface TextDescription {
    reducedNumber: number,
    rawNumber: number,
    initialLetterNumber: number
}

export function getNumberFromText(name: string) {
    if (cache.has(name)) {
        return cache.get(name);
    }

    let rawNumber = 0
    for (let ch of name) {
        rawNumber += getNumberFromAlphabet(ch);
    }

    const initialLetterNumber = name.length > 0 ? getNumberFromAlphabet(name[0]) : 0;

    const result = {
        reducedNumber: reduceNumber(rawNumber), rawNumber, initialLetterNumber
    }

    cache.set(name, result);

    return result;
}