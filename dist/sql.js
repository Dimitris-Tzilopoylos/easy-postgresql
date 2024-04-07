"use strict";

class SQL {
  constructor(cb) {
    this.sql = cb;
  }

  __getSQL(args) {
    const values = this.sql(args);
    if (typeof values === "string") {
      return [values, [], args.index];
    } else if (Array.isArray(values)) {
      if (values.length !== 2) {
        return ["", [], args.index];
      }
      return this.__getFormattedSQL(values[0], values[1], args.index || 1);
    } else {
      return ["", [], args.index];
    }
  }

  __getFormattedSQL(sql, args, index = 1) {
    let length = sql.split("%v").length - 1;
    while (length > 0) {
      sql = sql.replace("%v", `$${index}`);
      index++;
      length--;
    }
    return [sql, Array.isArray(args) ? args : [], index];
  }
}

module.exports = SQL;
