"use strict";

const {
  describe, it,
  assertEqual, assertDeepEqual, assertContains, assert, assertThrows,
} = require("./runner");

const {
  JsonUpdateOperators,
  JsonWhereClauseOperators,
  JSONBSetOperator,
  JSONBUnsetOperator,
  JSONUnsetOperator,
  JSONBInsertOperator,
  JSONBMergeOperator,
  JSONBArrayAppendOperator,
  JSONBCounterOperator,
  JSONBBooleanToggleOperator,
  JSONBArrayMultiAppendOperator,
  JSONBArrayPrependOperator,
  JSONBArrayMultiPrependOperator,
  JSONBArrayRemoveAtOperator,
} = require("../dist/json-operators");

// Executes a SQL instance and returns [sql, args]
function exec(sqlInstance, alias) {
  return sqlInstance.__getSQL({ index: 1, alias });
}

// ─── JSONSerializer (exercised through operators) ────────────────────────────

describe("JSONSerializer (via operators)", () => {
  it("serializes null as string 'null'", () => {
    const [, args] = exec(JsonUpdateOperators.mergeJsonb("col", null));
    assertEqual(args[0], "null");
  });

  it("serializes plain object to JSON string", () => {
    const [, args] = exec(JsonUpdateOperators.mergeJsonb("col", { a: 1 }));
    assertEqual(args[0], '{"a":1}');
  });

  it("serializes array to JSON string", () => {
    const [, args] = exec(JsonUpdateOperators.mergeJsonb("col", [1, 2, 3]));
    assertEqual(args[0], "[1,2,3]");
  });

  it("serializes number to JSON string", () => {
    const [, args] = exec(JsonUpdateOperators.mergeJsonb("col", 42));
    assertEqual(args[0], "42");
  });

  it("passes through a valid JSON string unchanged", () => {
    const [, args] = exec(JsonUpdateOperators.mergeJsonb("col", '{"x":1}'));
    assertEqual(args[0], '{"x":1}');
  });

  it("wraps a bare non-JSON string in quotes", () => {
    const [, args] = exec(JsonUpdateOperators.mergeJsonb("col", "hello"));
    assertEqual(args[0], '"hello"');
  });
});

// ─── JSONBaseOperator / toAliasedColumn ──────────────────────────────────────

describe("JSONBaseOperator (toAliasedColumn)", () => {
  it("wraps column in double quotes with no alias", () => {
    const [sql] = exec(JsonUpdateOperators.mergeJsonb("mydata", { a: 1 }));
    assertContains(sql, '"mydata"');
  });

  it("prepends alias when alias is passed", () => {
    const [sql] = exec(JsonUpdateOperators.mergeJsonb("mydata", { a: 1 }), "t");
    assertContains(sql, '"t"."mydata"');
  });

  it("path defaults to [] (not [undefined]) for operators without path", () => {
    const op = new JSONBMergeOperator("col", { x: 1 });
    assertDeepEqual(op.path, []);
  });

  it("path normalises string to single-element array", () => {
    const op = new JSONBUnsetOperator("col", "key");
    assertDeepEqual(op.path, ["key"]);
  });

  it("path keeps array as-is", () => {
    const op = new JSONBUnsetOperator("col", ["a", "b"]);
    assertDeepEqual(op.path, ["a", "b"]);
  });
});

// ─── Update operators ────────────────────────────────────────────────────────

describe("JsonUpdateOperators.setJsonb", () => {
  it("produces JSONB_SET with array path and value", () => {
    const [sql, args] = exec(JsonUpdateOperators.setJsonb("data", ["a", "b"], { x: 1 }));
    assertContains(sql, "JSONB_SET(");
    assertContains(sql, "$1::text[]");
    assertContains(sql, "$2::jsonb");
    assertContains(sql, "false");
    assertDeepEqual(args[0], ["a", "b"]);
    assertEqual(args[1], '{"x":1}');
  });

  it("createMissingKeys=true appears in SQL", () => {
    const [sql] = exec(JsonUpdateOperators.setJsonb("data", ["a"], "v", true));
    assertContains(sql, "true");
  });
});

describe("JsonUpdateOperators.unsetJsonb", () => {
  it("uses #- operator for multi-key path", () => {
    const [sql, args] = exec(JsonUpdateOperators.unsetJsonb("data", ["a", "b"]));
    assertContains(sql, "#-");
    assertContains(sql, "$1::text[]");
    assertDeepEqual(args[0], ["a", "b"]);
  });

  it("uses - operator for single-key path", () => {
    const [sql, args] = exec(JsonUpdateOperators.unsetJsonb("data", "mykey"));
    assertContains(sql, " - ");
    assertContains(sql, "$1::text");
    assertEqual(args[0], "mykey");
  });
});

describe("JsonUpdateOperators.unsetJson", () => {
  it("uses #- operator for multi-key path (no stray space before ::)", () => {
    const [sql] = exec(JsonUpdateOperators.unsetJson("data", ["a", "b"]));
    assertContains(sql, "#-");
    // must be $1::text[] not $1:: text[]
    assertContains(sql, "$1::text[]");
    assert(!sql.includes(":: "), "stray space before :: must not exist");
  });

  it("uses - operator for single key path (no stray space before ::)", () => {
    const [sql] = exec(JsonUpdateOperators.unsetJson("data", "key"));
    assertContains(sql, " - ");
    assertContains(sql, "$1::text");
    assert(!sql.includes(":: "), "stray space before :: must not exist");
  });
});

describe("JsonUpdateOperators.insertJsonb", () => {
  it("produces jsonb_insert with path and value", () => {
    const [sql, args] = exec(JsonUpdateOperators.insertJsonb("data", [0], "val"));
    assertContains(sql, "jsonb_insert(");
    assertContains(sql, "$1::text[]");
    assertContains(sql, "$2::jsonb");
    assertContains(sql, "false");
    assertDeepEqual(args[0], [0]);
    assertEqual(args[1], '"val"');
  });

  it("insertAfter=true appears in SQL", () => {
    const [sql] = exec(JsonUpdateOperators.insertJsonb("data", [0], "v", true));
    assertContains(sql, "true");
  });
});

describe("JsonUpdateOperators.mergeJsonb", () => {
  it("produces || operator with ::jsonb cast", () => {
    const [sql, args] = exec(JsonUpdateOperators.mergeJsonb("data", { a: 1 }));
    assertContains(sql, "|| $1::jsonb");
    assertEqual(args[0], '{"a":1}');
  });
});

describe("JsonUpdateOperators.arrayAppendJsonb", () => {
  it("produces jsonb_set with COALESCE append pattern", () => {
    const [sql, args] = exec(JsonUpdateOperators.arrayAppendJsonb("data", ["items"], "newval"));
    assertContains(sql, "jsonb_set(");
    assertContains(sql, "COALESCE(");
    assertContains(sql, "|| $3::jsonb");
    assertDeepEqual(args[0], ["items"]);
    assertDeepEqual(args[1], ["items"]);
    assertEqual(args[2], '"newval"');
  });
});

describe("JsonUpdateOperators.counterJsonb", () => {
  it("produces jsonb_set with numeric increment", () => {
    const [sql, args] = exec(JsonUpdateOperators.counterJsonb("data", ["count"], 5));
    assertContains(sql, "jsonb_set(");
    assertContains(sql, "to_jsonb(");
    assertContains(sql, "+ 5");
    assertDeepEqual(args[0], ["count"]);
    assertDeepEqual(args[1], ["count"]);
  });

  it("supports negative delta for decrement", () => {
    const [sql] = exec(JsonUpdateOperators.counterJsonb("data", ["views"], -1));
    assertContains(sql, "+ -1");
  });

  it("defaults delta to 1", () => {
    const [sql] = exec(JsonUpdateOperators.counterJsonb("data", ["n"]));
    assertContains(sql, "+ 1");
  });
});

describe("JsonUpdateOperators.booleanToggleJsonb", () => {
  it("produces jsonb_set with NOT COALESCE boolean pattern", () => {
    const [sql, args] = exec(JsonUpdateOperators.booleanToggleJsonb("data", ["active"]));
    assertContains(sql, "jsonb_set(");
    assertContains(sql, "NOT COALESCE(");
    assertContains(sql, "::boolean");
    assertDeepEqual(args[0], ["active"]);
    assertDeepEqual(args[1], ["active"]);
  });
});

describe("JsonUpdateOperators.arrayMultiAppendJsonb", () => {
  it("appends multiple values as jsonb array", () => {
    const [sql, args] = exec(
      JsonUpdateOperators.arrayMultiAppendJsonb("data", ["tags"], ["a", "b"])
    );
    assertContains(sql, "jsonb_set(");
    assertContains(sql, "COALESCE(");
    assertEqual(args[2], '["a","b"]');
  });

  it("wraps single value in array", () => {
    const [, args] = exec(
      JsonUpdateOperators.arrayMultiAppendJsonb("data", ["tags"], "solo")
    );
    assertEqual(args[2], '["solo"]');
  });
});

describe("JsonUpdateOperators.arrayPrependJsonb", () => {
  it("produces prepend pattern (value || COALESCE)", () => {
    const [sql, args] = exec(
      JsonUpdateOperators.arrayPrependJsonb("data", ["items"], "first")
    );
    assertContains(sql, "jsonb_set(");
    // value comes before COALESCE in prepend
    const valuePos = sql.indexOf("$2::jsonb");
    const coalescePos = sql.indexOf("COALESCE(");
    assert(valuePos < coalescePos, "value should appear before COALESCE in prepend");
    assertEqual(args[1], '"first"');
  });
});

describe("JsonUpdateOperators.arrayRemoveAtJsonb", () => {
  it("removes element at index using - operator", () => {
    const [sql, args] = exec(
      JsonUpdateOperators.arrayRemoveAtJsonb("data", ["items"], 2)
    );
    assertContains(sql, "jsonb_set(");
    assertContains(sql, ") - 2");
    assertDeepEqual(args[0], ["items"]);
  });
});

// ─── Where-clause comparison operators ───────────────────────────────────────

describe("JsonWhereClauseOperators — single-key path (parameterized after fix)", () => {
  it("equalsJsonb: uses -> and = with parameterized key", () => {
    const [sql, args] = exec(JsonWhereClauseOperators.equalsJsonb("col", "key", 42));
    assertContains(sql, "->$1");
    assertContains(sql, "= $2");
    assertEqual(args[0], "key");
    assertEqual(args[1], "42");
  });

  it("equalsJson: same pattern as equalsJsonb", () => {
    const [sql, args] = exec(JsonWhereClauseOperators.equalsJson("col", "key", "val"));
    assertContains(sql, "->$1");
    assertContains(sql, "= $2");
    assertEqual(args[0], "key");
    assertEqual(args[1], '"val"');
  });

  it("notEqualsJsonb: uses !=", () => {
    const [sql] = exec(JsonWhereClauseOperators.notEqualsJsonb("col", "k", 1));
    assertContains(sql, "!= $2");
  });

  it("greaterThanJsonb: uses >", () => {
    const [sql] = exec(JsonWhereClauseOperators.greaterThanJsonb("col", "k", 5));
    assertContains(sql, "> $2");
  });

  it("greaterThanOrEqualJsonb: uses >=", () => {
    const [sql] = exec(JsonWhereClauseOperators.greaterThanOrEqualJsonb("col", "k", 5));
    assertContains(sql, ">= $2");
  });

  it("lessThanJsonb: uses <", () => {
    const [sql] = exec(JsonWhereClauseOperators.lessThanJsonb("col", "k", 5));
    assertContains(sql, "< $2");
  });

  it("lessThanOrEqualJsonb: uses <=", () => {
    const [sql] = exec(JsonWhereClauseOperators.lessThanOrEqualJsonb("col", "k", 5));
    assertContains(sql, "<= $2");
  });
});

describe("JsonWhereClauseOperators — multi-key path", () => {
  it("equalsJsonb: uses #> with text[] cast", () => {
    const [sql, args] = exec(
      JsonWhereClauseOperators.equalsJsonb("col", ["a", "b"], 99)
    );
    assertContains(sql, "#>$1::text[]");
    assertContains(sql, "= $2");
    assertDeepEqual(args[0], ["a", "b"]);
    assertEqual(args[1], "99");
  });
});

describe("JsonWhereClauseOperators.containsJsonb", () => {
  it("uses ?| operator for key existence check", () => {
    const [sql, args] = exec(
      JsonWhereClauseOperators.containsJsonb("col", "key", ["a", "b"])
    );
    assertContains(sql, "?| $");
    assertContains(sql, "::text[]");
    assertDeepEqual(args[args.length - 1], ["a", "b"]);
  });

  it("wraps single value in array", () => {
    const [, args] = exec(
      JsonWhereClauseOperators.containsJsonb("col", "key", "singlekey")
    );
    assertDeepEqual(args[args.length - 1], ["singlekey"]);
  });
});

describe("JsonWhereClauseOperators.containedInJsonb (fix: ::jsonb cast)", () => {
  it("uses <@ operator with ::jsonb cast on value", () => {
    const [sql, args] = exec(
      JsonWhereClauseOperators.containedInJsonb("col", "key", { a: 1 })
    );
    assertContains(sql, "<@ $2::jsonb");
    assertEqual(args[0], "key");
    assertEqual(args[1], '{"a":1}');
  });

  it("containedInJson: same ::jsonb cast", () => {
    const [sql] = exec(
      JsonWhereClauseOperators.containedInJson("col", "key", { b: 2 })
    );
    assertContains(sql, "<@ $2::jsonb");
  });

  it("containedInJsonb with multi-key path uses #> and ::jsonb cast", () => {
    const [sql, args] = exec(
      JsonWhereClauseOperators.containedInJsonb("col", ["a", "b"], { x: 1 })
    );
    assertContains(sql, "#>$1::text[]");
    assertContains(sql, "<@ $2::jsonb");
    assertDeepEqual(args[0], ["a", "b"]);
  });
});

// ─── __toPath edge cases ──────────────────────────────────────────────────────

describe("JSONBaseOperator.__toPath", () => {
  it("throws when empty path array is provided to __toPath", () => {
    const op = new JSONBUnsetOperator("col", "x");
    assertThrows(() => op.__toPath([]), "Path is required");
  });

  it("single-element array returns [string, false]", () => {
    const op = new JSONBUnsetOperator("col", "x");
    const [p, isArray] = op.__toPath(["mykey"]);
    assertEqual(p, "mykey");
    assertEqual(isArray, false);
  });

  it("multi-element array returns [array, true]", () => {
    const op = new JSONBUnsetOperator("col", ["a", "b"]);
    const [p, isArray] = op.__toPath(["a", "b"]);
    assertDeepEqual(p, ["a", "b"]);
    assertEqual(isArray, true);
  });
});
