import isArray from './isArray';
import isNumber from './isNumber';
import isString from './isString';
import matches from './matches';
import inside from './inside';
import equals from './equals';
import numberEquals from './numberEquals';
import isNumeric from './isNumeric';
import isEmpty from './isEmpty';
import greaterThan from './greaterThan';
import greaterThanOrEquals from './greaterThanOrEquals';
import lessThan from './lessThan';
import lessThanOrEquals from './lessThanOrEquals';
import longerThan from './longerThan';
import longerThanOrEquals from './longerThanOrEquals';
import shorterThan from './shorterThan';
import shorterThanOrEquals from './shorterThanOrEquals';
import lengthEquals from './lengthEquals';
import isOdd from './isOdd';
import isEven from './isEven';
import isTruthy from './isTruthy';
import { extendRules } from '../lib';

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
    isTruthy
};

export default extendRules(rules);
