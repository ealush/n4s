import { isRule, globalObject } from '../lib';
import rules from '../rules';
import runner from './runner';

function Ensure(customRules = {}) {
    const rulesObject = {...rules, ...customRules};

    if (typeof globalObject.Proxy === 'function') {
        return () => {

            const registeredRules = [];

            const proxy = new Proxy(rulesObject, {
                get: (rules, ruleName) => {
                    if (ruleName === 'test') {
                        return (value) => (
                            registeredRules.every(({ name, args }) => (
                                runner(rules[name], value, ...args))
                            )
                        );
                    }

                    if (!isRule(rules, ruleName)) { return; }

                    return (...args) => {
                        registeredRules.push({
                            name: ruleName,
                            args
                        });
                        return proxy;
                    };
                }
            });
            return proxy;
        };
    }

    const rulesList = Object.keys(rulesObject);

    return () => {
        const registeredRules = [];

        return rulesList.reduce((allRules, ruleName) => {
            if (!isRule(rulesObject, ruleName)) { return; }

            allRules[ruleName] = (...args) => {
                registeredRules.push({
                    name: ruleName,
                    args
                });
                return allRules;
            };

            return allRules;

        }, {
            test: (value) => (
                registeredRules.every(({ name, args }) => (
                    runner(rules[name], value, ...args)
                ))
            )
        });
    };
}

const ensure = new Ensure();
ensure.Ensure = Ensure;

export default ensure;
