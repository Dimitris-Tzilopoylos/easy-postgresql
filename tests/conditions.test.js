"use strict";

const {
  describe,
  it,
  assertDeepEqual,
} = require("./runner");

const {
  and, or, iN, notIn, all, any, notAny,
  lt, lte, gt, gte, is, isNot,
  like, ilike, notLike, notIlike,
  isNull, isNotNull, eq, neq,
  contains, containedIn,
  keyExists, keyExistsAny, keyExistsAll,
  textSearch, inArray, notInArray,
  mergeConditions,
} = require("../dist/conditions");

describe("conditions", () => {
  // logical
  it("and() returns { _and: [...args] }", () => assertDeepEqual(and(1, 2, 3), { _and: [1, 2, 3] }));
  it("and() with no args returns {}", () => assertDeepEqual(and(), {}));
  it("or() returns { _or: [...args] }", () => assertDeepEqual(or("a", "b"), { _or: ["a", "b"] }));
  it("or() with no args returns {}", () => assertDeepEqual(or(), {}));

  // set operators
  it("iN() returns { _in: args }", () => assertDeepEqual(iN(1, 2, 3), { _in: [1, 2, 3] }));
  it("notIn() returns { _nin: args }", () => assertDeepEqual(notIn(1, 2), { _nin: [1, 2] }));
  it("all() returns { _all: args }", () => assertDeepEqual(all(1, 2), { _all: [1, 2] }));
  it("any() returns { _any: args }", () => assertDeepEqual(any(1, 2), { _any: [1, 2] }));
  it("notAny() returns { _nany: args }", () => assertDeepEqual(notAny(5), { _nany: [5] }));

  // comparison
  it("lt() wraps value", () => assertDeepEqual(lt(5), { _lt: 5 }));
  it("lte() wraps value", () => assertDeepEqual(lte(5), { _lte: 5 }));
  it("gt() wraps value", () => assertDeepEqual(gt(10), { _gt: 10 }));
  it("gte() wraps value", () => assertDeepEqual(gte(10), { _gte: 10 }));
  it("is() wraps value", () => assertDeepEqual(is("active"), { _is: "active" }));
  it("isNot() wraps value", () => assertDeepEqual(isNot("inactive"), { _is_not: "inactive" }));
  it("eq() wraps value", () => assertDeepEqual(eq(42), { _eq: 42 }));
  it("neq() wraps value", () => assertDeepEqual(neq(42), { _neq: 42 }));

  // pattern matching
  it("like() wraps value", () => assertDeepEqual(like("%foo%"), { _like: "%foo%" }));
  it("ilike() wraps value", () => assertDeepEqual(ilike("%Foo%"), { _ilike: "%Foo%" }));
  it("notLike() wraps value", () => assertDeepEqual(notLike("%bar%"), { _nlike: "%bar%" }));
  it("notIlike() wraps value", () => assertDeepEqual(notIlike("%Bar%"), { _nilike: "%Bar%" }));

  // null checks
  it("isNull() returns { _is: null }", () => assertDeepEqual(isNull(), { _is: null }));
  it("isNotNull() returns { _is_not: null }", () => assertDeepEqual(isNotNull(), { _is_not: null }));

  // JSON / array operators
  it("contains() wraps object value", () => assertDeepEqual(contains({ key: 1 }), { _contains: { key: 1 } }));
  it("containedIn() wraps object value", () => assertDeepEqual(containedIn({ a: 1 }), { _contained_in: { a: 1 } }));
  it("keyExists() wraps string key", () => assertDeepEqual(keyExists("mykey"), { _key_exists: "mykey" }));
  it("keyExistsAny() wraps array of keys", () => assertDeepEqual(keyExistsAny(["a", "b"]), { _key_exists_any: ["a", "b"] }));
  it("keyExistsAll() wraps array of keys", () => assertDeepEqual(keyExistsAll(["a", "b"]), { _key_exists_all: ["a", "b"] }));
  it("textSearch() wraps string", () => assertDeepEqual(textSearch("hello world"), { _text_search: "hello world" }));
  it("inArray() wraps array", () => assertDeepEqual(inArray([1, 2, 3]), { _in_array: [1, 2, 3] }));
  it("notInArray() wraps array", () => assertDeepEqual(notInArray([1, 2]), { _nin_array: [1, 2] }));

  // mergeConditions
  it("mergeConditions() merges two objects", () =>
    assertDeepEqual(mergeConditions({ a: 1 }, { b: 2 }), { a: 1, b: 2 }));
  it("mergeConditions() later keys overwrite earlier", () =>
    assertDeepEqual(mergeConditions({ a: 1 }, { a: 99 }), { a: 99 }));
  it("mergeConditions() with no args returns {}", () =>
    assertDeepEqual(mergeConditions(), {}));
  it("mergeConditions() with one arg returns that arg", () =>
    assertDeepEqual(mergeConditions({ x: 5 }), { x: 5 }));
  it("mergeConditions() with three args merges all", () =>
    assertDeepEqual(mergeConditions({ a: 1 }, { b: 2 }, { c: 3 }), { a: 1, b: 2, c: 3 }));
});
