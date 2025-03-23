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
  }
}
module.exports = Relation;
