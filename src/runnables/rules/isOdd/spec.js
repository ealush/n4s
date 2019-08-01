import faker from 'faker';
import isOdd from '.';

describe('Tests isOdd rule', () => {

    describe('When value is an odd number', () => {
        let oddNumbers = [];

        beforeAll(() => {
            let counter = 1;
            while(oddNumbers.length < 100) {
                oddNumbers.push(counter);
                counter+=2;
            }
        });

        it('Should return true', () => {
            oddNumbers.forEach((num) => {
                expect(isOdd(num)).toBe(true);
            });
        });

        describe('When value is a numeric string', () => {

            it('Should return true', () => {
                oddNumbers.forEach((num) => {
                    expect(isOdd(num.toString())).toBe(true);
                });
            });
        });

        describe('When value is negative', () => {
            it('Should return true', () => {
                oddNumbers.forEach((num) => {
                    expect(isOdd(-num)).toBe(true);
                });
            });
        });
    });

    describe('When value is an even number', () => {
        let evenNumbers = [];

        beforeAll(() => {
            let counter = 0;
            while(evenNumbers.length < 100) {
                evenNumbers.push(counter);
                counter+=2;
            }
        });

        it('Should return false', () => {
            evenNumbers.forEach((num) => {
                expect(isOdd(num)).toBe(false);
                expect(isOdd(-num)).toBe(false);
                expect(isOdd(num.toString())).toBe(false);
            });
        });
    });

    describe('When value is non numeric', () => {
        it('Should return false', () => {
            [
                faker.random.word(),
                new Array(),
                new Function(),
                new Object(),
                'withNumber1',
                '1hasNumber',
            ].forEach((value) => {
                expect(isOdd(value)).toBe(false);
            });
        });
    });
});
