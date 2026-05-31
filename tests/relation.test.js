"use strict";

const { describe, it, assert, assertEqual, assertDeepEqual, assertThrows, assertNotThrows } = require("./runner");
const Relation = require("../dist/relation");

describe("Relation", () => {
  const base = {
    alias: "u",
    from_table: "orders",
    to_table: "users",
    from_column: "user_id",
    to_column: "id",
    type: "has_many",
  };

  it("constructs with valid string columns", () => {
    assertNotThrows(() => new Relation(base));
  });

  it("stores all properties correctly", () => {
    const r = new Relation(base);
    assertEqual(r.alias, "u");
    assertEqual(r.from_table, "orders");
    assertEqual(r.to_table, "users");
    assertEqual(r.from_column, "user_id");
    assertEqual(r.to_column, "id");
    assertEqual(r.type, "has_many");
  });

  it("schema defaults to 'public' when not provided", () => {
    const r = new Relation(base);
    assertEqual(r.schema, "public");
  });

  it("schema stores custom value when provided", () => {
    const r = new Relation({ ...base, schema: "myschema" });
    assertEqual(r.schema, "myschema");
  });

  it("where defaults to {} when not provided", () => {
    const r = new Relation(base);
    assertDeepEqual(r.where, {});
  });

  it("where stores plain object when provided", () => {
    const r = new Relation({ ...base, where: { active: true } });
    assertDeepEqual(r.where, { active: true });
  });

  it("where ignores Date instances (treated as {})", () => {
    const r = new Relation({ ...base, where: new Date() });
    assertDeepEqual(r.where, {});
  });

  it("where ignores arrays (treated as {})", () => {
    const r = new Relation({ ...base, where: [1, 2, 3] });
    assertDeepEqual(r.where, {});
  });

  it("where ignores null (treated as {})", () => {
    const r = new Relation({ ...base, where: null });
    assertDeepEqual(r.where, {});
  });

  it("where ignores string (treated as {})", () => {
    const r = new Relation({ ...base, where: "status = active" });
    assertDeepEqual(r.where, {});
  });

  // --- array columns ---
  it("constructs when from_column and to_column are matching arrays", () => {
    assertNotThrows(() =>
      new Relation({
        ...base,
        from_column: ["a", "b"],
        to_column: ["x", "y"],
      })
    );
  });

  it("throws when from_column is array and to_column is string", () => {
    assertThrows(
      () => new Relation({ ...base, from_column: ["a", "b"], to_column: "x" }),
      "same length"
    );
  });

  it("throws when to_column is array and from_column is string", () => {
    assertThrows(
      () => new Relation({ ...base, from_column: "a", to_column: ["x", "y"] }),
      "same length"
    );
  });

  it("throws when from_column and to_column arrays have different lengths", () => {
    assertThrows(
      () =>
        new Relation({
          ...base,
          from_column: ["a", "b", "c"],
          to_column: ["x", "y"],
        }),
      "same length"
    );
  });

  it("throws when from_column is empty string", () => {
    assertThrows(
      () => new Relation({ ...base, from_column: "" }),
      "from and to column"
    );
  });

  it("throws when to_column is empty string", () => {
    assertThrows(
      () => new Relation({ ...base, to_column: "" }),
      "from and to column"
    );
  });
});
