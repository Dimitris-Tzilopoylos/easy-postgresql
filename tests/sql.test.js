"use strict";

const { describe, it, assertEqual, assertDeepEqual } = require("./runner");
const SQL = require("../dist/sql");
const { sqlRaw } = require("../dist/sql-raw");

describe("SQL", () => {
  it("__getFormattedSQL replaces each %v with $N starting at index", () => {
    const sql = new SQL(() => {});
    const [s, args, idx] = sql.__getFormattedSQL(
      "select %v from t where x = %v",
      ["col", 42],
      1
    );
    assertEqual(s, "select $1 from t where x = $2");
    assertDeepEqual(args, ["col", 42]);
    assertEqual(idx, 3);
  });

  it("__getFormattedSQL respects custom starting index", () => {
    const sql = new SQL(() => {});
    const [s, , nextIdx] = sql.__getFormattedSQL("x = %v", [1], 5);
    assertEqual(s, "x = $5");
    assertEqual(nextIdx, 6);
  });

  it("__getFormattedSQL with no placeholders leaves sql unchanged", () => {
    const sql = new SQL(() => {});
    const [s, args] = sql.__getFormattedSQL("select 1", [], 1);
    assertEqual(s, "select 1");
    assertDeepEqual(args, []);
  });

  it("__getFormattedSQL normalises non-array args to empty array", () => {
    const sql = new SQL(() => {});
    const [, args] = sql.__getFormattedSQL("select 1", null, 1);
    assertDeepEqual(args, []);
  });

  it("__getSQL: string return is passed through unchanged", () => {
    const sql = new SQL(() => "raw sql here");
    const [s, args] = sql.__getSQL({ index: 1 });
    assertEqual(s, "raw sql here");
    assertDeepEqual(args, []);
  });

  it("__getSQL: [template, args] return is formatted", () => {
    const sql = new SQL(() => ["x = %v", [99]]);
    const [s, args] = sql.__getSQL({ index: 1 });
    assertEqual(s, "x = $1");
    assertDeepEqual(args, [99]);
  });

  it("__getSQL: null return produces empty string", () => {
    const sql = new SQL(() => null);
    const [s, args] = sql.__getSQL({ index: 1 });
    assertEqual(s, "");
    assertDeepEqual(args, []);
  });

  it("__getSQL: array with wrong length produces empty string", () => {
    const sql = new SQL(() => ["one item only"]);
    const [s] = sql.__getSQL({ index: 1 });
    assertEqual(s, "");
  });

  it("__getSQL: passes args object (including alias) to callback", () => {
    const sql = new SQL((a) => [`${a.alias || "t"}.col = %v`, [1]]);
    const [s] = sql.__getSQL({ index: 1, alias: "u" });
    assertEqual(s, "u.col = $1");
  });

  it("__getSQL: index in args is used as starting placeholder number", () => {
    const sql = new SQL(() => ["a = %v and b = %v", [1, 2]]);
    const [s, , nextIdx] = sql.__getSQL({ index: 3 });
    assertEqual(s, "a = $3 and b = $4");
    assertEqual(nextIdx, 5);
  });
});

describe("sqlRaw", () => {
  it("sqlRaw returns an SQL instance", () => {
    const s = sqlRaw(() => ["x = %v", [1]]);
    assertEqual(typeof s.__getSQL, "function");
  });

  it("sqlRaw result produces correct SQL via __getSQL", () => {
    const s = sqlRaw(() => ["col = %v", [42]]);
    const [sql, args] = s.__getSQL({ index: 1 });
    assertEqual(sql, "col = $1");
    assertDeepEqual(args, [42]);
  });
});
