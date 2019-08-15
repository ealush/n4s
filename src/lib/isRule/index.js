const isRule = (rulesObject, name) => (
    Object.prototype.hasOwnProperty.call(rulesObject, name)
      && typeof rulesObject[name] === 'function'
);

export default isRule;
