const DB = require("./db");
const prompt = require("prompt-sync")({ sigint: true });

class DBManager {
  static async createSchema(schemaName = DB.database) {
    const up = `CREATE SCHEMA IF NOT EXISTS ${schemaName};`;
    const down = `DROP SCHEMA IF EXISTS ${schemaName} CASCADE;`;
    await DB.pool.query(up);
    return { up, down };
  }

  static async dropSchema(schemaName = DB.database) {
    const up = `DROP SCHEMA IF EXISTS ${schemaName} CASCADE;`;
    const down = `CREATE SCHEMA IF NOT EXISTS ${schemaName};`;
    await DB.pool.query(up);
    return { up, down };
  }

  static async dropTable(model) {
    const up = `DROP TABLE IF EXISTS ${model?.schema || DB.database}.${
      model.table
    } CASCADE;`;
    const down = `CREATE TABLE IF NOT EXISTS ${model?.schema || DB.database}.${
      model.table
    } (
            ${DBManager.modelColumnstoSql(model)}
        );`;
    await DB.pool.query(up);
    return { up, down };
  }

  static async createTable(model) {
    const up = `CREATE TABLE IF NOT EXISTS ${model?.schema || DB.database}.${
      model.table
    } (
            ${DBManager.modelColumnstoSql(model)}
        );`;
    const down = `DROP TABLE IF EXISTS ${model?.schema || DB.database}.${
      model.table
    } CASCADE;`;
    await DB.pool.query(up);
    return { up, down };
  }

  static modelColumnstoSql(model) {
    return Object.values(model.columns || {})
      .map((column) => DBManager.modelColumnToSQL(column))
      .join(",\n");
  }

  static modelColumnToSQL(column) {
    return `${column.column} ${column.type} ${
      column.columnConfig?.length ? `(${column.columnConfig?.length})` : ""
    } ${DBManager.modelColumnConstraints(column)}`;
  }

  static modelColumnConstraints(column) {
    const { columnConfig } = column;
    let sql = "";
    if (columnConfig.primary) {
      sql += ` PRIMARY KEY `;
    }

    if (columnConfig.unique) {
      if (Array.isArray(columnConfig.unique)) {
        sql += ` UNIQUE ${columnConfig.unique.join(",")} `;
      } else {
        sql += ` UNIQUE `;
      }
    }

    if (!columnConfig.nullable) {
      sql += " NOT NULL ";
    }

    if (typeof columnConfig.defaultValue !== "undefined") {
      sql += ` DEFAULT  ${columnConfig.defaultValue} `;
      // if (columnConfig.type === "uuid") {
      //   sql += ` DEFAULT  ${columnConfig.defaultValue} `;
      // } else if (
      //   ["now()", "current_timestamp"].indexOf(
      //     columnConfig.defaultValue?.toLowerCase()
      //   ) !== -1
      // ) {
      //   sql += ` DEFAULT  ${columnConfig.defaultValue} `;
      // } else {
      //   sql += ` DEFAULT '${columnConfig.defaultValue}'::${column.type} `;
      // }
    }

    if (columnConfig.checks?.length) {
      sql += ` CHECK (${columnConfig.checks.join(" ")})`;
    }

    return sql;
  }

  static createIndexes(model) {
    let up = ``;

    const primaryIndexes = Object.entries(model?.indexes?.primary || {});
    const foreignIndexes = Object.entries(model?.indexes?.foreign || {});
    const uniqueIndexes = Object.entries(model?.indexes?.unique || {});

    switch (type.toLowerCase()) {
      case "primary":
        up = `ALTER TABLE ${DB.database}.${model.table} ALTER column ${model} `;
    }
  }

  static async exec(sql, args = []) {
    await DB.pool.query(sql, args);
  }

  static async runBash(depth = 0) {
    if (depth === 0) {
      console.log("New Postgres CLI: ");
    }
    const sql = prompt("Enter SQL (press 1 to exit): ");
    if (sql.trim() === "1") {
      console.log("BYE");
      process.exit(0);
    }
    await DBManager.exec(sql);
    DBManager.runBash(depth + 1);
  }
}

module.exports = DBManager;
