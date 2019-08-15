import { isRule, proxySupported } from '../lib';
import rules from '../rules';
import runner from './runner';

const createTestFn = (registeredRules) => (
    (value) => (
        registeredRules.every(({ name, args }) => (
            runner(rules[name], value, ...args)
        ))
    )
);

const registerRule = (registeredRules, name, args) => [
    ...registeredRules, {
        name, args
    }
];

function Ensure(customRules = {}) {
    const rulesObject = {...rules, ...customRules};

    if (proxySupported) {
        return () => {
            let registeredRules = [];

            const proxy = new Proxy(rulesObject, {
                get: (rules, ruleName) => {
                    if (ruleName === 'test') {
                        return createTestFn(registeredRules);
                    }

                    if (!isRule(rules, ruleName)) { return; }

                    return (...args) => {
                        registeredRules = registerRule(registeredRules, ruleName, args);
                        return proxy;
                    };
                }
            });

            return proxy;
        };
    }

    const rulesList = Object.keys(rulesObject);

    return () => {
        let registeredRules = [];

        return rulesList.reduce((allRules, ruleName) => {
            if (!isRule(rulesObject, ruleName)) { return; }

            allRules[ruleName] = (...args) => {
                registeredRules = registerRule(registeredRules, ruleName, args);
                return allRules;
            };

            return allRules;

        }, {
            test: createTestFn(registeredRules)
        });
    };
}

const ensure = new Ensure();
ensure.Ensure = Ensure;

export default ensure;
