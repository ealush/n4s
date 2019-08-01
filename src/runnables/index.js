import isArray from './rules/isArray';
import isNumber from './rules/isNumber';
import isString from './rules/isString';
import matches from './rules/matches';
import inside from './rules/inside';
import equals from './rules/equals';
import numberEquals from './rules/numberEquals';
import isNumeric from './rules/isNumeric';
import isEmpty from './rules/isEmpty';
import greaterThan from './rules/greaterThan';
import greaterThanOrEquals from './rules/greaterThanOrEquals';
import lessThan from './rules/lessThan';
import lessThanOrEquals from './rules/lessThanOrEquals';
import longerThan from './rules/longerThan';
import longerThanOrEquals from './rules/longerThanOrEquals';
import shorterThan from './rules/shorterThan';
import shorterThanOrEquals from './rules/shorterThanOrEquals';
import lengthEquals from './rules/lengthEquals';
import isOdd from './rules/isOdd';
import isEven from './rules/isEven';
import extendRules from '../lib/extendRules';

const rules = {
    isArray,
    isNumber,
    isString,
    matches,
    inside,
    equals,
    numberEquals,
    isNumeric,
    isEmpty,
    greaterThan,
    greaterThanOrEquals,
    lessThan,
    lessThanOrEquals,
    longerThan,
    longerThanOrEquals,
    shorterThan,
    shorterThanOrEquals,
    lengthEquals,
    isOdd,
    isEven,
};

export default extendRules(rules);
