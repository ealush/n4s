import { isRule, globalObject } from '../lib';
import rules from '../rules';
import runner from './runner';

function Enforce(customRules = {}) {
    const rulesObject = {...rules, ...customRules};

    if (typeof globalObject.Proxy === 'function') {
        return (value) => {
            const proxy = new Proxy(rulesObject, {
                get: (rules, fnName) => {
                    if (!isRule(rules, fnName)) { return; }

                    return (...args) => {
                        runner(rules[fnName], value, ...args);
                        return proxy;
                    };
                }
            });
            return proxy;
        };
    }

    const rulesList = Object.keys(rulesObject);

    return (value) => rulesList.reduce((allRules, fnName) => {
        if (!isRule(rulesObject, fnName)) { return; }

        allRules[fnName] = (...args) => {
            runner(rulesObject[fnName], value, ...args);
            return allRules;
        };

        return allRules;
    }, {});
}

const enforce = new Enforce();
enforce.Enforce = Enforce;

export default enforce;
