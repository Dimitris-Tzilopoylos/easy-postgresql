"use strict";

const { describe, it, assert, assertEqual, assertDeepEqual } = require("./runner");
const V = require("../dist/validation");

describe("ValidationService", () => {
  // --- type guards ---
  it("isNumber: true for number", () => assert(V.isNumber(42)));
  it("isNumber: false for string '42'", () => assert(!V.isNumber("42")));
  it("isNumber: true for NaN (typeof NaN === 'number')", () => assert(V.isNumber(NaN)));
  it("isNumber: false for null", () => assert(!V.isNumber(null)));

  it("isString: true for string", () => assert(V.isString("hello")));
  it("isString: false for number", () => assert(!V.isString(42)));
  it("isString: false for null", () => assert(!V.isString(null)));

  it("isUndefined: true for undefined", () => assert(V.isUndefined(undefined)));
  it("isUndefined: false for null", () => assert(!V.isUndefined(null)));
  it("isUndefined: false for 0", () => assert(!V.isUndefined(0)));

  it("isBoolean: true for true", () => assert(V.isBoolean(true)));
  it("isBoolean: true for false", () => assert(V.isBoolean(false)));
  it("isBoolean: false for 1", () => assert(!V.isBoolean(1)));
  it("isBoolean: false for 'true'", () => assert(!V.isBoolean("true")));

  it("isFunction: true for arrow function", () => assert(V.isFunction(() => {})));
  it("isFunction: true for named function", () => assert(V.isFunction(function f() {})));
  it("isFunction: false for object", () => assert(!V.isFunction({})));
  it("isFunction: false for null", () => assert(!V.isFunction(null)));

  // --- null/undefined helpers ---
  it("isNull: true for null", () => assert(V.isNull(null)));
  it("isNull: true for string 'null'", () => assert(V.isNull("null")));
  it("isNull: true for string 'NULL' (case-insensitive)", () => assert(V.isNull("NULL")));
  it("isNull: true for '  null  ' (trimmed)", () => assert(V.isNull("  null  ")));
  it("isNull: false for 0", () => assert(!V.isNull(0)));
  it("isNull: false for empty string", () => assert(!V.isNull("")));
  it("isNull: false for undefined", () => assert(!V.isNull(undefined)));

  it("isNullOrUndefined: true for null", () => assert(V.isNullOrUndefined(null)));
  it("isNullOrUndefined: true for undefined", () => assert(V.isNullOrUndefined(undefined)));
  it("isNullOrUndefined: false for 0", () => assert(!V.isNullOrUndefined(0)));
  it("isNullOrUndefined: false for empty string", () => assert(!V.isNullOrUndefined("")));

  it("isNullOrUndefinedOrEmpty: true for null", () => assert(V.isNullOrUndefinedOrEmpty(null)));
  it("isNullOrUndefinedOrEmpty: true for undefined", () => assert(V.isNullOrUndefinedOrEmpty(undefined)));
  it("isNullOrUndefinedOrEmpty: true for empty string", () => assert(V.isNullOrUndefinedOrEmpty("")));
  it("isNullOrUndefinedOrEmpty: false for non-empty string", () => assert(!V.isNullOrUndefinedOrEmpty("x")));
  it("isNullOrUndefinedOrEmpty: false for 0", () => assert(!V.isNullOrUndefinedOrEmpty(0)));

  // --- isFalsy ---
  it("isFalsy: true for 0", () => assert(V.isFalsy(0)));
  it("isFalsy: true for '0'", () => assert(V.isFalsy("0")));
  it("isFalsy: true for 'false'", () => assert(V.isFalsy("false")));
  it("isFalsy: true for 'null'", () => assert(V.isFalsy("null")));
  it("isFalsy: true for 'undefined'", () => assert(V.isFalsy("undefined")));
  it("isFalsy: true for null", () => assert(V.isFalsy(null)));
  it("isFalsy: false for 1", () => assert(!V.isFalsy(1)));
  it("isFalsy: false for 'hello'", () => assert(!V.isFalsy("hello")));

  // --- isObject ---
  it("isObject: true for plain object", () => assert(V.isObject({ a: 1 })));
  it("isObject: true for empty object", () => assert(V.isObject({})));
  it("isObject: false for array", () => assert(!V.isObject([1, 2])));
  it("isObject: false for null", () => assert(!V.isObject(null)));
  it("isObject: false for string", () => assert(!V.isObject("hello")));
  it("isObject: false for number", () => assert(!V.isObject(42)));

  // --- isIntOrStringInt ---
  it("isIntOrStringInt: true for integer", () => assert(V.isIntOrStringInt(5)));
  it("isIntOrStringInt: true for '5'", () => assert(V.isIntOrStringInt("5")));
  it("isIntOrStringInt: true for '5abc' (parseInt parses prefix)", () => assert(V.isIntOrStringInt("5abc")));
  it("isIntOrStringInt: false for 'abc'", () => assert(!V.isIntOrStringInt("abc")));

  // --- validateNumber ---
  it("validateNumber: passes for value within range", () => assert(V.validateNumber({ value: 5, min: 1, max: 10 })));
  it("validateNumber: passes at min boundary", () => assert(V.validateNumber({ value: 1, min: 1 })));
  it("validateNumber: passes at max boundary", () => assert(V.validateNumber({ value: 10, max: 10 })));
  it("validateNumber: fails below min", () => assert(!V.validateNumber({ value: 0, min: 1 })));
  it("validateNumber: fails above max", () => assert(!V.validateNumber({ value: 11, max: 10 })));
  it("validateNumber: fails for string value", () => assert(!V.validateNumber({ value: "5" })));

  // --- validateString ---
  it("validateString: passes basic string", () => assert(V.validateString({ value: "hello" })));
  it("validateString: fails for non-string", () => assert(!V.validateString({ value: 42 })));
  it("validateString: fails too short", () => assert(!V.validateString({ value: "hi", min: 5 })));
  it("validateString: passes min boundary", () => assert(V.validateString({ value: "hello", min: 5 })));
  it("validateString: fails too long", () => assert(!V.validateString({ value: "hello world", max: 3 })));
  it("validateString: passes max boundary", () => assert(V.validateString({ value: "hey", max: 3 })));
  it("validateString: fails string with space when noWhiteSpace=true", () =>
    assert(!V.validateString({ value: "hello world", noWhiteSpace: true })));
  it("validateString: passes string without space when noWhiteSpace=true", () =>
    assert(V.validateString({ value: "helloworld", noWhiteSpace: true })));

  // --- isOneOf / isEveryOf ---
  it("isOneOf: true when value in options", () =>
    assert(V.isOneOf({ value: "b", options: ["a", "b", "c"] })));
  it("isOneOf: false when value not in options", () =>
    assert(!V.isOneOf({ value: "d", options: ["a", "b", "c"] })));
  it("isOneOf: works with non-array options (wraps in array)", () =>
    assert(V.isOneOf({ value: "x", options: "x" })));

  it("isEveryOf: true when all options match value", () =>
    assert(V.isEveryOf({ value: "x", options: ["x", "x"] })));
  it("isEveryOf: false when any option differs", () =>
    assert(!V.isEveryOf({ value: "x", options: ["x", "y"] })));

  // --- array helpers ---
  it("isNotEmptyArray: true for non-empty array", () => assert(V.isNotEmptyArray([1, 2])));
  it("isNotEmptyArray: false for empty array", () => assert(!V.isNotEmptyArray([])));
  it("isNotEmptyArray: false for string", () => assert(!V.isNotEmptyArray("abc")));
  it("isNotEmptyArray: false for null", () => assert(!V.isNotEmptyArray(null)));

  it("validateUniqueFieldSet: true for unique values", () =>
    assert(V.validateUniqueFieldSet([1, 2, 3])));
  it("validateUniqueFieldSet: false for duplicate values", () =>
    assert(!V.validateUniqueFieldSet([1, 2, 1])));
  it("validateUniqueFieldSet: true for single element", () =>
    assert(V.validateUniqueFieldSet([1])));
  it("validateUniqueFieldSet: supports custom getValue", () =>
    assert(V.validateUniqueFieldSet([{ id: 1 }, { id: 2 }], (x) => x.id)));
  it("validateUniqueFieldSet: detects duplicate via custom getValue", () =>
    assert(!V.validateUniqueFieldSet([{ id: 1 }, { id: 1 }], (x) => x.id)));

  it("isArrayOfType: true for all-number array", () =>
    assert(V.isArrayOfType([1, 2, 3], "number")));
  it("isArrayOfType: true for all-string array", () =>
    assert(V.isArrayOfType(["a", "b"], "string")));
  it("isArrayOfType: false for mixed array", () =>
    assert(!V.isArrayOfType([1, "2"], "number")));
  it("isArrayOfType: false for non-array", () =>
    assert(!V.isArrayOfType("abc", "string")));

  // --- validateEmail ---
  it("validateEmail: truthy for valid email", () => assert(!!V.validateEmail("user@example.com")));
  it("validateEmail: truthy for subdomain email", () => assert(!!V.validateEmail("user@mail.example.com")));
  it("validateEmail: falsy for no @ symbol", () => assert(!V.validateEmail("notanemail")));
  it("validateEmail: falsy for missing domain", () => assert(!V.validateEmail("user@")));

  // --- validateBody ---
  it("validateBody: passes with passing validators", () => {
    assert(
      V.validateBody(
        { name: "Alice", age: 30 },
        { name: [(v) => typeof v === "string"], age: [(v) => v >= 18] }
      )
    );
  });
  it("validateBody: fails with failing validator", () => {
    assert(
      !V.validateBody({ age: 10 }, { age: [(v) => v >= 18] })
    );
  });
  it("validateBody: false when data is not object", () =>
    assert(!V.validateBody("string", {})));
  it("validateBody: false when validators is not object", () =>
    assert(!V.validateBody({ a: 1 }, "string")));

  // --- throwAsyncResult ---
  it("throwAsyncResult: throws the error when error is provided", () => {
    let threw = false;
    try { V.throwAsyncResult(new Error("boom"), null); } catch { threw = true; }
    assert(threw);
  });
  it("throwAsyncResult: throws NOT_FOUND when no result", () => {
    let msg = "";
    try { V.throwAsyncResult(null, null); } catch (e) { msg = e.message; }
    assertEqual(msg, "NOT_FOUND");
  });
  it("throwAsyncResult: does not throw when result is truthy", () => {
    let threw = false;
    try { V.throwAsyncResult(null, { id: 1 }); } catch { threw = true; }
    assert(!threw);
  });

  // --- isDomain ---
  it("isDomain: true for https domain", () => assert(V.isDomain("https://example.com")));
  it("isDomain: true for http domain", () => assert(V.isDomain("http://example.com")));
  it("isDomain: true for http://localhost", () => assert(V.isDomain("http://localhost")));
  it("isDomain: true for https://localhost", () => assert(V.isDomain("https://localhost")));
  it("isDomain: false for non-string", () => assert(!V.isDomain(123)));
  it("isDomain: false for plain text", () => assert(!V.isDomain("not a domain!!")));
});
