import rules from '../rules';
import enforce from '..';
const Enforce = enforce.Enforce;
const allRules = Object.keys(rules);
const _proxy = Proxy;

const suite = (withoutProxy) => describe('Test enforce function', () => {
    let enforce = new Enforce({});

    if (withoutProxy) {
        beforeAll(() => {
            global.Proxy = undefined;
            delete global.Proxy;
            enforce = new Enforce({});
        });

        afterAll(() => {
            global.Proxy = _proxy;
        });
    }

    describe('Rules object', () => {
        it('Should expose rules as functions', () => {
            const en = enforce();
            allRules.forEach((rule) => expect(en[rule]).toBeInstanceOf(Function));
        });

        it('Should perdictably return rule object with same rules', () => {
            expect(Object.keys(enforce())).toEqual(Object.keys(enforce()));
        });

        it('Should return same rules object after every rule call', () => {
            let en;

            en = enforce(1);
            expect(en.isNumber()).toEqual(en.isNumeric());
            expect(en.isNumber()).toEqual(en);
            en = enforce('1');
            expect(en.isString()).toEqual(en.isNotEmpty());
            expect(en.isString()).toEqual(en);
            en = enforce([]);
            expect(en.isArray()).toEqual(en.lengthEquals(0));
            expect(en.isArray()).toEqual(en);
        });
    });

    describe('Test custom rule extensions', () => {

        let enforce;

        beforeEach(() => {
            enforce = new Enforce({
                isImpossible: (v) => !!v.match(/impossible/i),
                endsWith: (v, arg1) => v.slice(-arg1.length) === arg1
            });
        });

        it('Should throw on failing custom rule in regular test', () => {
            const t = () => enforce('The name is Snowball').endsWith('Snuffles');
            expect(t).toThrow(Error);
        });

        it('Should return silently for custom rule in regular test', () => {
            enforce('Impossible! The name is Snowball').endsWith('Snowball').isImpossible();
        });
    });

    it('Should throw errors on failing enforces', () => {
        const isNumber = () => enforce('a').isNumber(true);
        expect(isNumber).toThrow(Error);
    });
});

suite(false);
suite(true);
