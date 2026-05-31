"use strict";

const {
  describe, it,
  assert, assertEqual, assertDeepEqual, assertContains,
} = require("./runner");

const Model = require("../dist/model");
const Column = require("../dist/column");

function col(name, type = "text") {
  return new Column({ name, type });
}

function makeModel(table = "users", columns = {}) {
  const m = new Model(table);
  m.columns = columns;
  m.relations = {};
  return m;
}

// ─── constructor / initial state ─────────────────────────────────────────────

describe("Model constructor", () => {
  it("stores the table name", () => {
    const m = new Model("products");
    assertEqual(m.table, "products");
  });

  it("schema defaults to 'public'", () => {
    const m = new Model("products");
    assertEqual(m.schema, "public");
  });

  it("schema can be set explicitly", () => {
    const m = new Model("products", null, "shop");
    assertEqual(m.schema, "shop");
  });

  it("relations is an empty object", () => {
    const m = new Model("products");
    assertDeepEqual(m.relations, {});
  });

  it("columns is an empty object", () => {
    const m = new Model("products");
    assertDeepEqual(m.columns, {});
  });

  it("context is an empty object", () => {
    const m = new Model("products");
    assertDeepEqual(m.context, {});
  });

  it("isAggregate is false", () => {
    const m = new Model("products");
    assert(!m.isAggregate);
  });
});

// ─── context management ───────────────────────────────────────────────────────

describe("Model context management", () => {
  it("setContextValue stores a value", () => {
    const m = makeModel();
    m.setContextValue("userId", 42);
    assertEqual(m.context["userId"], 42);
  });

  it("getContextValue retrieves the stored value", () => {
    const m = makeModel();
    m.setContextValue("role", "admin");
    assertEqual(m.getContextValue("role"), "admin");
  });

  it("getContextValue returns undefined for missing key", () => {
    const m = makeModel();
    assertEqual(m.getContextValue("missing"), undefined);
  });

  it("deleteContextValue removes and returns the value", () => {
    const m = makeModel();
    m.setContextValue("token", "abc123");
    const returned = m.deleteContextValue("token");
    assertEqual(returned, "abc123");
    assertEqual(m.getContextValue("token"), undefined);
  });

  it("deleteContextValue returns undefined for missing key", () => {
    const m = makeModel();
    assertEqual(m.deleteContextValue("nope"), undefined);
  });

  it("clearContext removes all stored values", () => {
    const m = makeModel();
    m.setContextValue("a", 1);
    m.setContextValue("b", 2);
    m.clearContext();
    assertDeepEqual(m.context, {});
  });
});

// ─── _mergeRelationalWhere ────────────────────────────────────────────────────

describe("Model#_mergeRelationalWhere", () => {
  const m = makeModel();

  it("merges two where objects", () => {
    assertDeepEqual(
      m._mergeRelationalWhere({ a: 1 }, { b: 2 }),
      { a: 1, b: 2 }
    );
  });

  it("second object overrides first on collision", () => {
    assertDeepEqual(
      m._mergeRelationalWhere({ a: 1 }, { a: 99 }),
      { a: 99 }
    );
  });

  it("empty first object returns second", () => {
    assertDeepEqual(m._mergeRelationalWhere({}, { x: 5 }), { x: 5 });
  });

  it("empty second object returns first", () => {
    assertDeepEqual(m._mergeRelationalWhere({ x: 5 }, {}), { x: 5 });
  });

  it("both empty returns empty object", () => {
    assertDeepEqual(m._mergeRelationalWhere({}, {}), {});
  });
});

// ─── columnsStrNoAlias getter ─────────────────────────────────────────────────

describe("Model#columnsStrNoAlias", () => {
  it("returns comma-separated column names", () => {
    const m = makeModel("users", {
      id: col("id", "integer"),
      email: col("email", "text"),
    });
    assertEqual(m.columnsStrNoAlias, "id,email");
  });

  it("returns empty string when no columns", () => {
    const m = makeModel("t", {});
    assertEqual(m.columnsStrNoAlias, "");
  });
});

// ─── getModelColumnsCommaSeperatedString ─────────────────────────────────────

describe("Model#getModelColumnsCommaSeperatedString", () => {
  const m = makeModel("products", {
    id: col("id", "integer"),
    title: col("title", "text"),
    price: col("price", "numeric"),
  });

  it("no alias: uses table name in quotes", () => {
    const result = m.getModelColumnsCommaSeperatedString(null, null, null);
    assertContains(result, '"products"."id"');
    assertContains(result, '"products"."title"');
    assertContains(result, '"products"."price"');
  });

  it("with alias: uses alias in quotes", () => {
    const result = m.getModelColumnsCommaSeperatedString("p", null, null);
    assertContains(result, '"p"."id"');
    assertContains(result, '"p"."title"');
  });

  it("select filter only returns selected columns", () => {
    const result = m.getModelColumnsCommaSeperatedString("p", { id: true, title: true }, null);
    assertContains(result, '"p"."id"');
    assertContains(result, '"p"."title"');
    assert(!result.includes('"p"."price"'), "price should be excluded by select filter");
  });

  it("empty select falls through to all columns", () => {
    const result = m.getModelColumnsCommaSeperatedString("p", {}, null);
    assertContains(result, '"p"."id"');
    assertContains(result, '"p"."title"');
    assertContains(result, '"p"."price"');
  });

  it("extras functions are appended to column list", () => {
    const extras = {
      full_info: (alias) => `concat("${alias}"."title", ' - ', "${alias}"."price"::text)`,
    };
    const result = m.getModelColumnsCommaSeperatedString("p", null, extras);
    assertContains(result, '"p"."id"');
    assertContains(result, "concat(");
  });

  it("select with extras appends extra functions", () => {
    const extras = { raw_price: (alias) => `"${alias}"."price"::text` };
    const result = m.getModelColumnsCommaSeperatedString("p", { id: true }, extras);
    assertContains(result, '"p"."id"');
    assertContains(result, '"p"."price"::text');
  });

  it("empty columns returns empty string", () => {
    const empty = makeModel("t", {});
    assertEqual(empty.getModelColumnsCommaSeperatedString("t", null, null), "");
  });
});
