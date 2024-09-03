"use strict";

const DB = require("./db");
const ValidationService = require("./validation");
class Model extends DB {
  constructor(table, connection = null, schema = "public") {
    super(table, connection, schema);
    this.table = table;
    this.schema = schema;
    this.relations = {};
    this.columns = {};
    this.isAggregate = false;
  }
  getModelColumnsCommaSeperatedString(alias, select, extras) {
    if (ValidationService.isObject(select)) {
      let columns = Object.values(this.columns)
        .filter((c) => !!select[c.column])
        .map((c) => `"${alias ? alias : this.table}"."${c.column}"`);
      if (extras && ValidationService.isObject(extras)) {
        columns = columns.concat(
          Object.values(extras)
            .filter((x) => typeof x === "function")
            .map((x) => x(alias || this.table))
        );
      }
      if (columns.length > 0) {
        return columns.join(",");
      }
    }

    if (extras && ValidationService.isObject(extras)) {
      return Object.values(this.columns)
        .map((c) => `${alias ? alias : this.table}.${c.column}`)
        .concat(
          Object.values(extras)
            .filter((x) => typeof x === "function")
            .map((x) => x(alias || this.table))
        )
        .join(",");
    }
    return Object.values(this.columns)
      .map((c) => `"${alias ? alias : this.table}"."${c.column}"`)
      .join(",");
  }
  get columnsStrNoAlias() {
    return Object.values(this.columns)
      .map((c) => `${c.column}`)
      .join(",");
  }
}
module.exports = Model;
