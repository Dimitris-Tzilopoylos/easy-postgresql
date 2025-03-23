const and = (...args) => (!args?.length ? {} : { _and: args });
const or = (...args) => (!args?.length ? {} : { _or: args });
const iN = (...args) => ({ _in: args });
const notIn = (...args) => ({ _nin: args });
const all = (...args) => ({ _all: args });
const any = (...args) => ({ _any: args });
const notAny = (...args) => ({ _nany: args });
const lt = (value) => ({ _lt: value });
const lte = (value) => ({ _lte: value });
const gt = (value) => ({ _gt: value });
const gte = (value) => ({ _gte: value });
const is = (value) => ({ _is: value });
const isNot = (value) => ({ _is_not: value });
const like = (value) => ({ _like: value });
const ilike = (value) => ({ _ilike: value });
const notLike = (value) => ({ _nlike: value });
const notIlike = (value) => ({ _nilike: value });
const isNull = () => ({ _is: null });
const isNotNull = () => ({ _is_not: null });
const eq = (value) => ({ _eq: value });
const neq = (value) => ({ _neq: value });
const contains = (value) => ({ _contains: value });
const containedIn = (value) => ({ _contained_in: value });
const keyExists = (value) => ({ _key_exists: value });
const keyExistsAny = (value) => ({ _key_exists_any: value });
const keyExistsAll = (value) => ({ _key_exists_all: value });
const textSearch = (value) => ({ _text_search: value });
const inArray = (value) => ({ _in_array: value });
const notInArray = (value) => ({ _nin_array: value });
const mergeConditions = (...conditions) =>
  !conditions?.length
    ? {}
    : conditions.reduce((acc, cond) => {
        Object.assign(acc, cond);
        return acc;
      }, {});

module.exports = {
  and,
  or,
  iN,
  notIn,
  all,
  any,
  notAny,
  lt,
  lte,
  gt,
  gte,
  is,
  isNot,
  like,
  ilike,
  notLike,
  notIlike,
  isNull,
  isNotNull,
  eq,
  neq,
  contains,
  containedIn,
  keyExists,
  keyExistsAny,
  keyExistsAll,
  textSearch,
  inArray,
  notInArray,
  mergeConditions,
};
