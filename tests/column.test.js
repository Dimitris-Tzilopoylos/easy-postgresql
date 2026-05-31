"use strict";

const { describe, it, assert, assertEqual, assertDeepEqual } = require("./runner");
const Column = require("../dist/column");

describe("Column", () => {
  it("stores name and type in columnConfig", () => {
    const col = new Column({ name: "id", type: "integer" });
    assertEqual(col.columnConfig.name, "id");
    assertEqual(col.columnConfig.type, "integer");
  });

  it("column getter returns just name when no alias", () => {
    const col = new Column({ name: "email", type: "text" });
    assertEqual(col.column, "email");
  });

  it("column getter returns alias.name when alias is set", () => {
    const col = new Column({ name: "email", type: "text", alias: "u" });
    assertEqual(col.column, "u.email");
  });

  it("type getter returns the column type", () => {
    const col = new Column({ name: "x", type: "varchar" });
    assertEqual(col.type, "varchar");
  });

  it("alias getter returns alias when set", () => {
    const col = new Column({ name: "x", type: "text", alias: "tbl" });
    assertEqual(col.alias, "tbl");
  });

  it("alias getter returns undefined when not set", () => {
    const col = new Column({ name: "x", type: "text" });
    assertEqual(col.alias, undefined);
  });

  it("nullable defaults to true", () => {
    const col = new Column({ name: "x", type: "text" });
    assertEqual(col.columnConfig.nullable, true);
  });

  it("nullable can be explicitly set to false", () => {
    const col = new Column({ name: "x", type: "text", nullable: false });
    assertEqual(col.columnConfig.nullable, false);
  });

  it("checks returns empty array when constraints is omitted", () => {
    const col = new Column({ name: "x", type: "int" });
    assertDeepEqual(col.checks, []);
  });

  it("checks returns empty array for empty constraints array", () => {
    const col = new Column({ name: "x", type: "int", constraints: [] });
    assertDeepEqual(col.checks, []);
  });

  it("checks returns constraints array as-is", () => {
    const col = new Column({ name: "x", type: "int", constraints: ["x > 0", "x < 100"] });
    assertDeepEqual(col.checks, ["x > 0", "x < 100"]);
  });

  it("checks wraps a single string constraint in an array", () => {
    const col = new Column({ name: "x", type: "int", constraints: "x > 0" });
    assertDeepEqual(col.checks, ["x > 0"]);
  });

  it("stores primary flag", () => {
    const col = new Column({ name: "id", type: "int", primary: true });
    assert(col.columnConfig.primary === true);
  });

  it("stores unique flag", () => {
    const col = new Column({ name: "email", type: "text", unique: true });
    assert(col.columnConfig.unique === true);
  });

  it("stores auto_increment flag", () => {
    const col = new Column({ name: "id", type: "int", auto_increment: true });
    assert(col.columnConfig.auto_increment === true);
  });

  it("stores foreign flag", () => {
    const col = new Column({ name: "user_id", type: "int", foreign: true });
    assert(col.columnConfig.foreign === true);
  });

  it("stores references config", () => {
    const refs = { table: "users", column: "id" };
    const col = new Column({ name: "user_id", type: "int", references: refs });
    assertDeepEqual(col.columnConfig.references, refs);
  });

  it("stores defaultValue", () => {
    const col = new Column({ name: "status", type: "text", defaultValue: "active" });
    assertEqual(col.columnConfig.defaultValue, "active");
  });

  it("stores length", () => {
    const col = new Column({ name: "name", type: "varchar", length: 255 });
    assertEqual(col.columnConfig.length, 255);
  });

  it("stores min and max", () => {
    const col = new Column({ name: "age", type: "int", min: 0, max: 150 });
    assertEqual(col.columnConfig.min, 0);
    assertEqual(col.columnConfig.max, 150);
  });
});
