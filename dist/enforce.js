(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.enforce = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  /**
   * Collects rules with `negativeForm` or `alias` attributes.
   * Adds a rule with the correct configuration.
   * @param {Object} rules - enforce rules object
   * @returns {Object} extended rules object
   */
  function extendRules(rules) {
    var _loop = function _loop(rule) {
      var negativeForm = rules[rule].negativeForm;
      var alias = rules[rule].alias;

      if (negativeForm) {
        rules[negativeForm] = function () {
          return !rules[rule].apply(rules, arguments);
        };
      }

      if (alias) {
        rules[alias] = rules[rule];
      }
    };

    for (var rule in rules) {
      _loop(rule);
    }

    return rules;
  }

  var isRule = function isRule(rulesObject, name) {
    return Object.prototype.hasOwnProperty.call(rulesObject, name) && typeof rulesObject[name] === 'function';
  };

  var globalObject = Function('return this')();

  function isArray(value) {
    return Boolean(Array.isArray(value));
  }

  isArray.negativeForm = 'isNotArray';

  function isNumber(value) {
    return Boolean(typeof value === 'number');
  }

  isNumber.negativeForm = 'isNotNumber';

  function isString(value) {
    return Boolean(typeof value === 'string');
  }

  isString.negativeForm = 'isNotString';

  function matches(value, regex) {
    if (regex instanceof RegExp) {
      return regex.test(value);
    } else if (typeof regex === 'string') {
      return new RegExp(regex).test(value);
    } else {
      return false;
    }
  }

  matches.negativeForm = 'notMatches';

  function inside(value, arg1) {
    if (Array.isArray(arg1) && ['string', 'number', 'boolean'].includes(_typeof(value))) {
      return arg1.includes(value);
    } // both value and arg1 are strings


    if (typeof arg1 === 'string' && typeof value === 'string') {
      return arg1.includes(value);
    }

    return false;
  }

  inside.negativeForm = 'notInside';

  function equals(value, arg1) {
    return value === arg1;
  }

  equals.negativeForm = 'notEquals';

  function isNumeric(value) {
    var result = !isNaN(parseFloat(value)) && !isNaN(Number(value)) && isFinite(value);
    return Boolean(result);
  }

  isNumeric.negativeForm = 'isNotNumeric';

  function numberEquals(value, arg1) {
    return isNumeric(value) && isNumeric(arg1) && Number(value) === Number(arg1);
  }

  numberEquals.negativeForm = 'numberNotEquals';

  function isEmpty(value) {
    if (!value) {
      return true;
    } else if (isNumeric(value)) {
      return value === 0;
    } else if (Object.prototype.hasOwnProperty.call(value, 'length')) {
      return value.length === 0;
    } else if (_typeof(value) === 'object') {
      return Object.keys(value).length === 0;
    } else {
      return true;
    }
  }

  isEmpty.negativeForm = 'isNotEmpty';

  function greaterThan(value, arg1) {
    return isNumeric(value) && isNumeric(arg1) && Number(value) > Number(arg1);
  }

  greaterThan.alias = 'gt';

  function greaterThanOrEquals(value, arg1) {
    return isNumeric(value) && isNumeric(arg1) && Number(value) >= Number(arg1);
  }

  greaterThanOrEquals.alias = 'gte';

  function lessThan(value, arg1) {
    return isNumeric(value) && isNumeric(arg1) && Number(value) < Number(arg1);
  }

  lessThan.alias = 'lt';

  function lessThanOrEquals(value, arg1) {
    return isNumeric(value) && isNumeric(arg1) && Number(value) <= Number(arg1);
  }

  lessThanOrEquals.alias = 'lte';

  function longerThan(value, arg1) {
    return value.length > arg1;
  }

  function longerThanOrEquals(value, arg1) {
    return value.length >= arg1;
  }

  function shorterThan(value, arg1) {
    return value.length < arg1;
  }

  function shorterThanOrEquals(value, arg1) {
    return value.length <= arg1;
  }

  function lengthEquals(value, arg1) {
    return value.length === arg1;
  }

  lengthEquals.negativeForm = 'lengthNotEquals';

  /**
   * Validates that a given value is an odd number
   * @param {Number|String} value Value to be validated
   * @return {Boolean}
   */

  var isOdd = function isOdd(value) {
    if (!isNumeric(value)) {
      return false;
    }

    return value % 2 !== 0;
  };

  /**
   * Validates that a given value is an even number
   * @param {Number|String} value Value to be validated
   * @return {Boolean}
   */

  var isEven = function isEven(value) {
    if (!isNumeric(value)) {
      return false;
    }

    return value % 2 === 0;
  };

  var rules = {
    isArray: isArray,
    isNumber: isNumber,
    isString: isString,
    matches: matches,
    inside: inside,
    equals: equals,
    numberEquals: numberEquals,
    isNumeric: isNumeric,
    isEmpty: isEmpty,
    greaterThan: greaterThan,
    greaterThanOrEquals: greaterThanOrEquals,
    lessThan: lessThan,
    lessThanOrEquals: lessThanOrEquals,
    longerThan: longerThan,
    longerThanOrEquals: longerThanOrEquals,
    shorterThan: shorterThan,
    shorterThanOrEquals: shorterThanOrEquals,
    lengthEquals: lengthEquals,
    isOdd: isOdd,
    isEven: isEven
  };
  var rules$1 = extendRules(rules);

  /**
   * Run a single rule against enforced value (e.g. `isNumber()`)
   *
   * @param {Function} rule - rule to run
   * @param {Any} value
   * @param {Array} args list of arguments sent from consumer
   * @throws
   */
  function runner(rule, value) {
    if (typeof rule !== 'function') {
      return;
    }

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (rule.apply(void 0, [value].concat(args)) !== true) {
      throw new Error("[Enforce]: invalid ".concat(_typeof(value), " value"));
    }
  }

  function Enforce() {
    var customRules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var rulesObject = _objectSpread2({}, rules$1, {}, customRules);

    if (typeof globalObject.Proxy === 'function') {
      return function (value) {
        var proxy = new Proxy(rulesObject, {
          get: function get(rules, fnName) {
            if (!isRule(rules, fnName)) {
              return;
            }

            return function () {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              runner.apply(void 0, [rules[fnName], value].concat(args));
              return proxy;
            };
          }
        });
        return proxy;
      };
    }

    var rulesList = Object.keys(rulesObject);
    return function (value) {
      return rulesList.reduce(function (allRules, fnName) {
        if (!isRule(rulesObject, fnName)) {
          return;
        }

        allRules[fnName] = function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          runner.apply(void 0, [rulesObject[fnName], value].concat(args));
          return allRules;
        };

        return allRules;
      }, {});
    };
  }

  var enforce = new Enforce();
  enforce.Enforce = Enforce;

  return enforce;

}));
