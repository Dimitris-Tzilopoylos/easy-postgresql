"use strict";

const DB = require("./db");
const ValidationService = require("./validation");
class Model extends DB {
  constructor(table, connection = null) {
    super(table, connection);
    this.table = table;
    this.relations = {};
    this.columns = {};
    this.isAggregate = false;
  }
  getModelColumnsCommaSeperatedString(alias, select) {
    if (ValidationService.isObject(select)) {
      const columns = Object.values(this.columns)
        .filter((c) => !!select[c.column])
        .map((c) => `${alias ? alias : this.table}.${c.column}`);
      if (columns.length > 0) {
        return columns.join(",");
      }
    }
    return Object.values(this.columns)
      .map((c) => `${alias ? alias : this.table}.${c.column}`)
      .join(",");
  }
  get columnsStrNoAlias() {
    return Object.values(this.columns)
      .map((c) => `${c.column}`)
      .join(",");
  }
}
module.exports = Model;
