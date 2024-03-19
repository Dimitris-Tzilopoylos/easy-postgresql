"use strict";

class RawSQL {
  constructor(sql, args = []) {
    this.sql = sql;
    this.args = args;
  }
  __replace_alias(alias) {
    if (!alias) {
      return this.sql;
    }
    let length = this.sql.split("__alias__").length - 1;
    let str = this.sql;
    while (length > 0) {
      str = str.replace("__alias__", alias);
      length--;
    }
    return str;
  }
  __getFormattedSQL(index = 1, alias) {
    let length = this.sql.split("?").length - 1;
    let str = this.__replace_alias(alias);
    while (length > 0) {
      str = str.replace("?", `$${index}`);
      index++;
      length--;
    }
    return [str, this.args, index];
  }
}
module.exports = RawSQL;