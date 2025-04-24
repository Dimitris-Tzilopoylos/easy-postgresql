"use strict";

class Relation {
  constructor({
    alias,
    from_table,
    to_table,
    from_column,
    to_column,
    type,
    schema,
    where,
  }) {
    this.alias = alias;
    this.from_table = from_table;
    this.to_table = to_table;
    this.from_column = from_column;
    this.to_column = to_column;
    this.type = type;
    this.schema = schema || "public";
    this.where =
      !!where &&
      typeof where === "object" &&
      !Array.isArray(where) &&
      !(where instanceof Date)
        ? where
        : {};

    this.validateRelationConfig();
  }

  validateRelationConfig() {
    if (
      Array.isArray(this.from_column) &&
      (!Array.isArray(this.to_column) ||
        this.to_column.length !== this.from_column.length)
    ) {
      throw new Error(
        `when from and to column are arrays, they must have the same length`
      );
    }
    if (
      Array.isArray(this.to_column) &&
      (!Array.isArray(this.from_column) ||
        this.to_column.length !== this.from_column.length)
    ) {
      throw new Error(
        `when from and to column are arrays, they must have the same length`
      );
    }

    if (!this.from_column.length || !this.to_column.length) {
      throw new Error(`please provide from and to column values`);
    }
  }
}
module.exports = Relation;
