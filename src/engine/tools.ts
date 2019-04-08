export function reduceNumber(n: number): number {
    while (n >= 10) {
        n = reducePartial(n);
    }

    return n;
}

export function reducePartial(n: number): number {
    if (n < 10) {
        return n;
    }

    let result = 0;
    while (n > 0) {
        result += n % 10;
        n = Math.floor(n / 10);
    }

    return result;
}