import * as moment from 'moment';

class numerology {

    getDigits(number: number): Array<number> {
        var result: Array<number> = [];
        while (number > 0) {
            var digit = number % 10;
            result.unshift(digit);
            number = Math.floor(number / 10);
        }
        return result;
    }

    reduceNumber(number: number): number[] {
        let numberCounted: Array<number> = [];
        while (number >= 10) {
            let counted = this.getDigits(number).reduce((prev, current) => prev + current);
            numberCounted.push(counted);
            number = counted;
        }
        return numberCounted;
    }

    sumMainNumbers(mainNumbers: number[]): number {
        return mainNumbers.reduce((prev, current, index) =>
            prev + index * current
            , 0);
    }

    getMainNumbers(date: Date) {
        let mainNumbers: Array<number> = [];
        for (let digit of this.getDigits(date.getDate())) {
            mainNumbers[digit] = mainNumbers[digit] || 0;
            mainNumbers[digit]++;
        }

        // zero based months
        for (let digit of this.getDigits(date.getMonth() + 1)) {
            mainNumbers[digit] = mainNumbers[digit] || 0;
            mainNumbers[digit]++;
        }

        for (let digit of this.getDigits(date.getFullYear())) {
            mainNumbers[digit] = mainNumbers[digit] || 0;
            mainNumbers[digit]++;
        }
        return mainNumbers;
    }

    analyse(date: Date) {
        let month = date.getMonth() + 1;
        let dayCounted = this.reduceNumber(date.getDate());
        let yearCounted = this.reduceNumber(date.getFullYear());
        let mainNumbers = this.getMainNumbers(date);
        let sum = this.sumMainNumbers(mainNumbers);
        let sumCounted = this.reduceNumber(sum);
        let countedNumbers: number[] = [];
        let that = this;
        return {
            day: date.getDate(),
            month: month,
            year: date.getFullYear(),
            dayCounted: dayCounted,
            //monthCounted: monthCounted,
            yearCounted: yearCounted,
            sum: sum,
            sumCounted,
            mainNumbers: mainNumbers,
            countedNumbers() {
                let result: Array<number> = [];
                for (let number of dayCounted) {
                    for (let digit of that.getDigits(number)) {
                        result[digit] = result[digit] || 0;
                        result[digit]++;
                    }
                }
                for (let number of yearCounted) {
                    for (let digit of that.getDigits(number)) {
                        result[digit] = result[digit] || 0;
                        result[digit]++;
                    }
                }

                for (let digit of that.getDigits(sum)) {
                    result[digit] = result[digit] || 0;
                    result[digit]++;
                }

                for (let number of sumCounted) {
                    for (let digit of that.getDigits(number)) {
                        result[digit] = result[digit] || 0;
                        result[digit]++;
                    }
                }
                return result;
            },
            isKingNumber() {
                let digits = that.getDigits(sum)
                return digits.length === 2 && digits[0] == digits[1];
            }
        }
    }
}

export default new numerology();