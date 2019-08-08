# Enforce - n4s
Enforce is a validation assertions library. It allows you to run your data against rules and conditions and test whether it passes your validations. It is intended for validation logic that gets repeated over and over again and should not be written manually. It comes with a wide-variety of pre-built rules, but it can also be extended to support your own repeated custom logic.

The way Enforce operates is similar to most common assertion libraries. You pass it a value, and one or more rules to test your value against - if the validation fails, it throws an Error, otherwise - it will move on to the next rule rule in the chain.

```js
import enforce from 'n4s'

enforce(4)
    .isNumber();
// passes

enforce(4)
    .isNumber()
    .greaterThan(2);
// passes

enforce(4)
    .lessThan(2) // throws an error, will not carry on to the next rule
    .greaterThan(3);
```

## Installation

```
npm i n4s
```

## Content
- [List of Enforce rules](./rules)
- [Custom Enforce Rules](./custom)
