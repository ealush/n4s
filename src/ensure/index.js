import rules from '../runnables';
import runner from './runner';

const isRule = (rulesObject, name) => (
    Object.prototype.hasOwnProperty.call(rulesObject, name)
      && typeof rulesObject[name] === 'function'
);

function Ensure(customRules = {}) {
    const rulesObject = {...rules, ...customRules};

    if (typeof Proxy === 'function') {
        return () => {

            const registeredRules = [];

            const proxy = new Proxy(rulesObject, {
                get: (rules, ruleName) => {
                    if (ruleName === 'test') {
                        return (value) => {
                            return registeredRules.every(({ name, args }) => runner(rules[name], value, ...args));
                        };
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

    // This is relatively heavier, and preferably should only be done when lacking proxy support
    return (value) => Object.keys(rulesObject).reduce((allRules, ruleName) => {
        if (!isRule(rulesObject, ruleName)) { return allRules; }

        allRules[ruleName] = (...args) => {
            runner(rulesObject[ruleName], value, ...args);
            return allRules;
        };

        return allRules;
    }, {});
}

const ensure = new Ensure();
ensure.Ensure = Ensure;

export default ensure;
