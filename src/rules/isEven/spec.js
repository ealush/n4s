import faker from 'faker';
import isEven from '.';

describe('Tests isEven rule', () => {

    describe('When value is an even number', () => {
        let evenNumbers = [];

        beforeAll(() => {
            let counter = 0;
            while(evenNumbers.length < 100) {
                evenNumbers.push(counter);
                counter+=2;
            }
        });

        it('Should return true', () => {
            evenNumbers.forEach((num) => {
                expect(isEven(num)).toBe(true);
            });
        });

        describe('When value is a numeric string', () => {

            it('Should return true', () => {
                evenNumbers.forEach((num) => {
                    expect(isEven(num.toString())).toBe(true);
                });
            });
        });

        describe('When value is negative', () => {
            it('Should return true', () => {
                evenNumbers.forEach((num) => {
                    expect(isEven(-num)).toBe(true);
                });
            });
        });
    });

    describe('When value is an odd number', () => {
        let oddNumbers = [];

        beforeAll(() => {
            let counter = 1;
            while(oddNumbers.length < 100) {
                oddNumbers.push(counter);
                counter+=2;
            }
        });

        it('Should return false', () => {
            oddNumbers.forEach((num) => {
                expect(isEven(num)).toBe(false);
                expect(isEven(-num)).toBe(false);
                expect(isEven(num.toString())).toBe(false);
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
                'withNumber2',
                '2hasNumber',
            ].forEach((value) => {
                expect(isEven(value)).toBe(false);
            });
        });
    });
});
