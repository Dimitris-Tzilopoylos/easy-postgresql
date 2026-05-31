"use strict";

const {
  describe, it,
  assert, assertEqual, assertDeepEqual, assertContains, assertThrows, assertNotThrows,
} = require("./runner");

const DB = require("../dist/db");
const Column = require("../dist/column");
const Relation = require("../dist/relation");

// ─── helpers ─────────────────────────────────────────────────────────────────

function col(name, type = "text") {
  return new Column({ name, type });
}

function makeDB(table = "users", columns = {}) {
  const db = new DB(table);
  db.columns = columns;
  db.relations = {};
  return db;
}

// ─── static type-guard methods ────────────────────────────────────────────────

describe("DB static type guards", () => {
  it("isObject: true for plain object", () => assert(DB.isObject({ a: 1 })));
  it("isObject: false for array", () => assert(!DB.isObject([1, 2])));
  it("isObject: false for null", () => assert(!DB.isObject(null)));
  it("isObject: false for undefined", () => assert(!DB.isObject(undefined)));
  it("isObject: false for string", () => assert(!DB.isObject("hello")));
  it("isObject: false for number", () => assert(!DB.isObject(42)));

  it("isString: true for string", () => assert(DB.isString("hi")));
  it("isString: false for number", () => assert(!DB.isString(42)));
  it("isString: false for null", () => assert(!DB.isString(null)));

  it("isUndefined: true for undefined", () => assert(DB.isUndefined(undefined)));
  it("isUndefined: false for null", () => assert(!DB.isUndefined(null)));

  it("isNull: true for null", () => assert(DB.isNull(null)));
  it("isNull: true for string 'null'", () => assert(DB.isNull("null")));
  it("isNull: true for '  NULL  '", () => assert(DB.isNull("  NULL  ")));
  it("isNull: false for 0", () => assert(!DB.isNull(0)));
  it("isNull: false for empty string", () => assert(!DB.isNull("")));

  it("isNullOrUndefined: true for null", () => assert(DB.isNullOrUndefined(null)));
  it("isNullOrUndefined: true for undefined", () => assert(DB.isNullOrUndefined(undefined)));
  it("isNullOrUndefined: false for 0", () => assert(!DB.isNullOrUndefined(0)));

  it("isNullOrUndefinedOrEmpty: true for empty string", () => assert(DB.isNullOrUndefinedOrEmpty("")));
  it("isNullOrUndefinedOrEmpty: true for null", () => assert(DB.isNullOrUndefinedOrEmpty(null)));
  it("isNullOrUndefinedOrEmpty: false for 0", () => assert(!DB.isNullOrUndefinedOrEmpty(0)));
  it("isNullOrUndefinedOrEmpty: false for '0'", () => assert(!DB.isNullOrUndefinedOrEmpty("0")));
});

// ─── static aggregate / relation helpers ─────────────────────────────────────

describe("DB static aggregate helpers", () => {
  it("getIsAggregate: true for alias ending in _aggregate", () =>
    assert(DB.getIsAggregate("orders_aggregate")));
  it("getIsAggregate: false for plain alias", () =>
    assert(!DB.getIsAggregate("orders")));
  it("getIsAggregate: false for undefined", () =>
    assert(!DB.getIsAggregate(undefined)));

  it("getRelationNameWithoutAggregate: strips _aggregate suffix", () =>
    assertEqual(DB.getRelationNameWithoutAggregate("orders_aggregate"), "orders"));
  it("getRelationNameWithoutAggregate: returns name unchanged when not aggregate", () =>
    assertEqual(DB.getRelationNameWithoutAggregate("orders"), "orders"));
  it("getRelationNameWithoutAggregate: returns empty string for falsy input", () =>
    assertEqual(DB.getRelationNameWithoutAggregate(null), ""));
  it("getRelationNameWithoutAggregate: returns empty string for undefined", () =>
    assertEqual(DB.getRelationNameWithoutAggregate(undefined), ""));
});

// ─── makeDepthAlias ───────────────────────────────────────────────────────────

describe("DB#makeDepthAlias", () => {
  const db = makeDB();

  it("returns _depth_alias format", () =>
    assertEqual(db.makeDepthAlias("users", 0), "_0_users"));
  it("depth 1", () =>
    assertEqual(db.makeDepthAlias("orders", 1), "_1_orders"));
  it("depth 3", () =>
    assertEqual(db.makeDepthAlias("items", 3), "_3_items"));
});

// ─── makeLimit / makeOffset ───────────────────────────────────────────────────

describe("DB#makeLimit", () => {
  const db = makeDB();

  it("returns limit clause for a number", () => {
    const [sql, args, idx] = db.makeLimit(10, 1);
    assertEqual(sql, "limit $1");
    assertDeepEqual(args, [10]);
    assertEqual(idx, 2);
  });
  it("respects starting index", () => {
    const [sql, , idx] = db.makeLimit(5, 4);
    assertEqual(sql, "limit $4");
    assertEqual(idx, 5);
  });
  it("returns empty for null", () => {
    const [sql, args, idx] = db.makeLimit(null, 1);
    assertEqual(sql, "");
    assertDeepEqual(args, []);
    assertEqual(idx, 1);
  });
  it("returns empty for undefined", () => {
    const [sql] = db.makeLimit(undefined, 1);
    assertEqual(sql, "");
  });
  it("returns empty for empty string", () => {
    const [sql] = db.makeLimit("", 1);
    assertEqual(sql, "");
  });
  it("returns limit clause for 0 (0 is valid)", () => {
    const [sql, args] = db.makeLimit(0, 1);
    assertEqual(sql, "limit $1");
    assertDeepEqual(args, [0]);
  });
});

describe("DB#makeOffset", () => {
  const db = makeDB();

  it("returns offset clause for a number", () => {
    const [sql, args, idx] = db.makeOffset(20, 2);
    assertEqual(sql, "offset $2");
    assertDeepEqual(args, [20]);
    assertEqual(idx, 3);
  });
  it("returns empty for null", () => {
    const [sql] = db.makeOffset(null, 1);
    assertEqual(sql, "");
  });
  it("returns empty for undefined", () => {
    const [sql] = db.makeOffset(undefined, 1);
    assertEqual(sql, "");
  });
});

// ─── forUpdateResolve ─────────────────────────────────────────────────────────

describe("DB#forUpdateResolve", () => {
  const db = makeDB();

  it("false returns empty string", () => assertEqual(db.forUpdateResolve(false), ""));
  it("undefined returns empty string", () => assertEqual(db.forUpdateResolve(undefined), ""));
  it("null returns empty string", () => assertEqual(db.forUpdateResolve(null), ""));
  it("true returns 'for update'", () => assertEqual(db.forUpdateResolve(true), "for update"));
  it("'for_update' returns 'for update'", () =>
    assertEqual(db.forUpdateResolve("for_update"), "for update"));
  it("'for_share' returns 'for share'", () =>
    assertEqual(db.forUpdateResolve("for_share"), "for share"));
  it("'for_no_key_update' returns correct string", () =>
    assertEqual(db.forUpdateResolve("for_no_key_update"), "for no key update"));
  it("unknown string returns empty string", () =>
    assertEqual(db.forUpdateResolve("unknown"), ""));
});

// ─── combineOrderBy ───────────────────────────────────────────────────────────

describe("DB#combineOrderBy", () => {
  const db = makeDB();

  it("returns empty string when both are empty", () =>
    assertEqual(db.combineOrderBy("", ""), ""));
  it("returns 'order by col asc' when only columns", () =>
    assertEqual(db.combineOrderBy("col asc", ""), "order by col asc "));
  it("returns 'order by  agg' when only aggregation", () =>
    assertEqual(db.combineOrderBy("", "agg"), "order by  agg"));
  it("combines both with comma when both present", () => {
    const result = db.combineOrderBy("col asc", "agg desc");
    assertContains(result, "order by");
    assertContains(result, "col asc");
    assertContains(result, ",agg desc");
  });
});

// ─── isArrayComparison ────────────────────────────────────────────────────────

describe("DB#isArrayComparison", () => {
  const db = makeDB();

  it("detects _in_array operator", () => {
    const [ok, sql, key] = db.isArrayComparison({ _in_array: [1, 2] });
    assert(ok);
    assertContains(sql, "= any");
    assertEqual(key, "_in_array");
  });
  it("detects _nin_array operator", () => {
    const [ok, sql, key] = db.isArrayComparison({ _nin_array: [1, 2] });
    assert(ok);
    assertContains(sql, "<> any");
    assertEqual(key, "_nin_array");
  });
  it("returns false for non-array operator", () => {
    const [ok] = db.isArrayComparison({ _eq: 5 });
    assert(!ok);
  });
  it("returns false for empty object", () => {
    const [ok] = db.isArrayComparison({});
    assert(!ok);
  });
});

// ─── isInstantEqualityInWhereClause ──────────────────────────────────────────

describe("DB#isInstantEqualityInWhereClause", () => {
  const db = makeDB("users", {
    id: col("id", "integer"),
    data: col("data", "jsonb"),
    name: col("name", "text"),
  });

  it("true for scalar value on non-json column", () =>
    assert(db.isInstantEqualityInWhereClause("id", 1)));
  it("true for string value on non-json column", () =>
    assert(db.isInstantEqualityInWhereClause("name", "alice")));
  it("false for object config", () =>
    assert(!db.isInstantEqualityInWhereClause("id", { _gt: 5 })));
  it("false for json column", () =>
    assert(!db.isInstantEqualityInWhereClause("data", { key: 1 })));
  it("false for unknown column", () =>
    assert(!db.isInstantEqualityInWhereClause("nonexistent", 1)));
});

// ─── makeRelationalWhereAliases ───────────────────────────────────────────────

describe("DB#makeRelationalWhereAliases", () => {
  const db = makeDB();

  it("single column produces equality join", () => {
    const r = new Relation({
      alias: "user",
      from_table: "orders",
      to_table: "users",
      from_column: "user_id",
      to_column: "id",
      type: "belongs_to",
    });
    const sql = db.makeRelationalWhereAliases("_0_orders", "_1_users", r);
    assertEqual(sql, '"_0_orders"."user_id" = "_1_users"."id"');
  });

  it("array columns produces AND-joined equalities", () => {
    const r = new Relation({
      alias: "item",
      from_table: "orders",
      to_table: "items",
      from_column: ["order_id", "item_type"],
      to_column: ["id", "type"],
      type: "has_many",
    });
    const sql = db.makeRelationalWhereAliases("_0_orders", "_1_items", r);
    assertContains(sql, '"_0_orders"."order_id" = "_1_items"."id"');
    assertContains(sql, '"_0_orders"."item_type" = "_1_items"."type"');
    assertContains(sql, " and ");
  });
});

// ─── makeGroupBy ─────────────────────────────────────────────────────────────

describe("DB#makeGroupBy", () => {
  const db = makeDB("orders", {
    status: col("status", "text"),
    user_id: col("user_id", "integer"),
  });

  it("returns empty string for undefined", () =>
    assertEqual(db.makeGroupBy(undefined, "o"), ""));
  it("returns empty string for empty array", () =>
    assertEqual(db.makeGroupBy([], "o"), ""));
  it("returns empty string for non-array", () =>
    assertEqual(db.makeGroupBy("status", "o"), ""));
  it("returns empty string for unknown column", () =>
    assertEqual(db.makeGroupBy(["nonexistent"], "o"), ""));
  it("returns group by for known column with alias", () => {
    const sql = db.makeGroupBy(["status"], "o");
    assertEqual(sql, 'group by "o"."status"');
  });
  it("returns group by for multiple known columns", () => {
    const sql = db.makeGroupBy(["status", "user_id"], "o");
    assertContains(sql, "group by");
    assertContains(sql, '"o"."status"');
    assertContains(sql, '"o"."user_id"');
  });
  it("skips unknown columns in mixed list", () => {
    const sql = db.makeGroupBy(["status", "unknown"], "o");
    assertContains(sql, '"o"."status"');
    assert(!sql.includes("unknown"));
  });
});

// ─── makeOrderBy ─────────────────────────────────────────────────────────────

describe("DB#makeOrderBy", () => {
  const db = makeDB("users", {
    name: col("name", "text"),
    age: col("age", "integer"),
  });

  it("returns empty for undefined", () => {
    const [sql, args, idx] = db.makeOrderBy(undefined, 1, "u");
    assertEqual(sql, "");
    assertDeepEqual(args, []);
    assertEqual(idx, 1);
  });
  it("returns order by for known column asc", () => {
    const [sql] = db.makeOrderBy({ name: "asc" }, 1, "u");
    assertEqual(sql, 'order by  "u"."name"  asc');
  });
  it("returns order by for known column desc", () => {
    const [sql] = db.makeOrderBy({ age: "desc" }, 1, "u");
    assertEqual(sql, 'order by  "u"."age"  desc');
  });
  it("defaults to asc for unknown direction", () => {
    const [sql] = db.makeOrderBy({ name: "sideways" }, 1, "u");
    assertContains(sql, "asc");
  });
  it("skips unknown column", () => {
    const [sql] = db.makeOrderBy({ nonexistent: "asc" }, 1, "u");
    assertEqual(sql, "");
  });
  it("handles multiple columns", () => {
    const [sql] = db.makeOrderBy({ name: "asc", age: "desc" }, 1, "u");
    assertContains(sql, '"u"."name"');
    assertContains(sql, '"u"."age"');
    assertContains(sql, "desc");
  });
});

// ─── makeWhereClause ─────────────────────────────────────────────────────────

describe("DB#makeWhereClause", () => {
  const db = makeDB("users", {
    id: col("id", "integer"),
    name: col("name", "text"),
    status: col("status", "text"),
    age: col("age", "integer"),
  });

  it("empty where returns empty string", () => {
    const [sql, args, idx] = db.makeWhereClause(db, {}, 1, "u", true, true);
    assertEqual(sql, "");
    assertDeepEqual(args, []);
    assertEqual(idx, 1);
  });

  it("null/non-object where returns empty string", () => {
    const [sql] = db.makeWhereClause(db, null, 1, "u", true, true);
    assertEqual(sql, "");
  });

  it("column equality: { id: 1 } → instant equality", () => {
    const [sql, args, idx] = db.makeWhereClause(db, { id: 1 }, 1, "u", true, true);
    assertContains(sql, "where");
    assertContains(sql, '"u"."id"');
    assertContains(sql, "= $1");
    assertDeepEqual(args, [1]);
    assertEqual(idx, 2);
  });

  it("standalone operator: { _eq: 42 } produces = $1", () => {
    const [sql, args] = db.makeWhereClause(db, { _eq: 42 }, 1, "u", true, true);
    assertContains(sql, "=");
    assertContains(sql, "$1");
    assertDeepEqual(args, [42]);
  });

  it("_is: null produces IS NULL", () => {
    const [sql, args] = db.makeWhereClause(db, { _is: null }, 1, "u", true, true);
    assertContains(sql, "is");
    assertContains(sql, "NULL");
    assertDeepEqual(args, []);
  });

  it("_is_not: null produces IS NOT NULL", () => {
    const [sql] = db.makeWhereClause(db, { _is_not: null }, 1, "u", true, true);
    assertContains(sql, "is not");
    assertContains(sql, "NULL");
  });

  it("_lt operator on bare value", () => {
    const [sql, args] = db.makeWhereClause(db, { _lt: 10 }, 1, "u", true, true);
    assertContains(sql, "<");
    assertContains(sql, "$1");
    assertDeepEqual(args, [10]);
  });

  it("column with nested _like", () => {
    const [sql, args] = db.makeWhereClause(
      db, { name: { _like: "%alice%" } }, 1, "u", true, true
    );
    assertContains(sql, '"u"."name"');
    assertContains(sql, "like");
    assertContains(sql, "$1");
    assertDeepEqual(args, ["%alice%"]);
  });

  it("column with _ilike wraps value with %...%", () => {
    const [sql, args] = db.makeWhereClause(
      db, { name: { _ilike: "alice" } }, 1, "u", true, true
    );
    assertContains(sql, "ilike");
    assertContains(sql, "$1");
    assertDeepEqual(args, ["%alice%"]);
  });

  it("column with _in uses = any($N) with array arg", () => {
    const [sql, args] = db.makeWhereClause(
      db, { status: { _in: ["active", "pending"] } }, 1, "u", true, true
    );
    assertContains(sql, "= any");
    assertDeepEqual(args, [["active", "pending"]]);
  });

  it("column with _between produces BETWEEN $N and $N+1", () => {
    const [sql, args] = db.makeWhereClause(
      db, { age: { _between: [18, 65] } }, 1, "u", true, true
    );
    assertContains(sql, "between");
    assertContains(sql, "$1");
    assertContains(sql, "$2");
    assertDeepEqual(args, [18, 65]);
  });

  it("multiple columns ANDed together", () => {
    const [sql, args] = db.makeWhereClause(
      db, { id: 1, status: "active" }, 1, "u", true, true
    );
    assertContains(sql, '"u"."id"');
    assertContains(sql, '"u"."status"');
    assertContains(sql, "and");
    assert(args.includes(1));
    assert(args.includes("active"));
  });

  it("_and binder groups with parentheses", () => {
    const [sql, args] = db.makeWhereClause(
      db,
      { _and: [{ id: 1 }, { status: "active" }] },
      1, "u", true, true
    );
    assertContains(sql, "(");
    assertContains(sql, ")");
    assertContains(sql, '"u"."id"');
    assertContains(sql, '"u"."status"');
    assertDeepEqual(args, [1, "active"]);
  });

  it("_or binder groups with parentheses", () => {
    const [sql, args] = db.makeWhereClause(
      db,
      { _or: [{ id: 1 }, { id: 2 }] },
      1, "u", true, true
    );
    assertContains(sql, "(");
    assertContains(sql, "or");
    assert(args.includes(1));
    assert(args.includes(2));
  });

  it("throws when _and/or receives non-array", () => {
    assertThrows(
      () => db.makeWhereClause(db, { _and: "not-array" }, 1, "u", true, true),
      "No Array provided"
    );
  });

  it("throws for completely unknown key", () => {
    assertThrows(
      () => db.makeWhereClause(db, { nonexistent_key: 1 }, 1, "u", true, true),
      "UNKNOWN OPERATION"
    );
  });

  it("startWithWhere=false omits 'where' keyword", () => {
    const [sql] = db.makeWhereClause(db, { id: 1 }, 1, "u", true, false);
    assert(!sql.startsWith("where"), `SQL should not start with 'where': ${sql}`);
  });

  it("index increments correctly across multiple conditions", () => {
    const [, , idx] = db.makeWhereClause(
      db, { id: 1, age: 25 }, 1, "u", true, true
    );
    assertEqual(idx, 3);
  });
});

// ─── getModelColumnsCommaSeperatedString (DB version has a bug) ───────────────

describe("DB#getModelColumnsCommaSeperatedString", () => {
  const db = makeDB("users", {
    id: col("id", "integer"),
    name: col("name", "text"),
    email: col("email", "text"),
  });

  it("no alias: returns all columns quoted with table name", () => {
    const result = db.getModelColumnsCommaSeperatedString(null, null, null);
    assertContains(result, '"users"."id"');
    assertContains(result, '"users"."name"');
    assertContains(result, '"users"."email"');
  });

  it("with alias: returns all columns quoted with alias", () => {
    const result = db.getModelColumnsCommaSeperatedString("u", null, null);
    assertContains(result, '"u"."id"');
    assertContains(result, '"u"."name"');
  });

  it("extras functions are appended", () => {
    const extras = { full_name: (alias) => `concat(${alias}.first, ' ', ${alias}.last)` };
    const result = db.getModelColumnsCommaSeperatedString("u", null, extras);
    assertContains(result, "concat(u.first");
  });

  it("empty columns returns empty string", () => {
    const emptyDB = makeDB("t", {});
    const result = emptyDB.getModelColumnsCommaSeperatedString("t", null, null);
    assertEqual(result, "");
  });
});

// ─── columnsStrNoAlias getter ─────────────────────────────────────────────────

describe("DB#columnsStrNoAlias", () => {
  it("returns comma-separated bare column names", () => {
    const db = makeDB("users", {
      id: col("id", "integer"),
      name: col("name", "text"),
    });
    assertEqual(db.columnsStrNoAlias, "id,name");
  });

  it("returns empty string when no columns", () => {
    const db = makeDB("t", {});
    assertEqual(db.columnsStrNoAlias, "");
  });
});

// ─── splitRelationalAndModelColumnsInput ─────────────────────────────────────

describe("DB#splitRelationalAndModelColumnsInput", () => {
  const db = makeDB("users", {
    id: col("id", "integer"),
    name: col("name", "text"),
  });
  db.relations = {
    orders: { alias: "orders", from_column: "id", to_column: "user_id", to_table: "orders", type: "has_many", schema: "public" },
  };

  it("splits column keys into first bucket", () => {
    const [cols, rels] = db.splitRelationalAndModelColumnsInput({ id: 1, name: "alice" });
    assertDeepEqual(cols, { id: 1, name: "alice" });
    assertDeepEqual(rels, {});
  });

  it("splits relation keys into second bucket", () => {
    const [cols, rels, hasRel] = db.splitRelationalAndModelColumnsInput({
      id: 1,
      orders: { where: {} },
    });
    assertDeepEqual(cols, { id: 1 });
    assert("orders" in rels);
    assert(hasRel);
  });

  it("ignores unknown keys when no allowedEntries", () => {
    const [cols, rels] = db.splitRelationalAndModelColumnsInput({ unknown: "x" });
    assertDeepEqual(cols, {});
    assertDeepEqual(rels, {});
  });

  it("allowedEntries allows extra keys into column bucket", () => {
    const [cols] = db.splitRelationalAndModelColumnsInput(
      { id: 1, extra: "x" },
      ["extra"]
    );
    assertDeepEqual(cols, { id: 1, extra: "x" });
  });
});
