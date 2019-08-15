import { sample } from 'lodash';
import rules from '../rules';
import ensure from '..';
const Ensure = ensure.Ensure;
const allRules = Object.keys(rules);
const _proxy = Proxy;

const suite = (withoutProxy) => describe('Test ensure function', () => {
    let ensure = new Ensure({});

    if (withoutProxy) {
        beforeAll(() => {
            global.Proxy = undefined;
            delete global.Proxy;
            ensure = new Ensure({});
        });

        afterAll(() => {
            global.Proxy = _proxy;
        });
    }

    describe('Rules object', () => {
        it('Should expose rules as functions', () => {
            const en = ensure();
            allRules.forEach((rule) => expect(en[rule]).toBeInstanceOf(Function));
        });

        it('Should expose `test` function', () => {
            expect(
                ensure()[sample(allRules)]()[sample(allRules)]().test
            ).toBeInstanceOf(Function);
        });

        it('Should perdictably return rule object with same rules', () => {
            expect(Object.keys(ensure())).toEqual(Object.keys(ensure()));
        });

        it('Should return same rules object after every rule call', () => {
            let en;

            en = ensure();
            expect(en[sample(allRules)]()).toEqual(en[sample(allRules)]());
            expect(en[sample(allRules)]()).toEqual(en);
            en = ensure();
            expect(en[sample(allRules)]()).toEqual(en[sample(allRules)]());
            expect(en[sample(allRules)]()).toEqual(en);
        });
    });
});

suite(false);
suite(true);
