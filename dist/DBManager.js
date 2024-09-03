"use strict";

const Column = require("./column");
const DB = require("./db");
const prompt = require("prompt-sync")({
  sigint: true,
});
class DBManager {
  static async createSchema(schemaName = DB.database) {
    const up = `create schema if not exists ${schemaName};`;
    const down = `drop schema if exists ${schemaName} cascade;`;
    await DB.pool.query(up);
    return {
      up,
      down,
    };
  }
  static async dropSchema(schemaName = DB.database) {
    const up = `drop schema if exists ${schemaName} cascade;`;
    const down = `create schema if not exists ${schemaName};`;
    await DB.pool.query(up);
    return {
      up,
      down,
    };
  }
  static async dropTable(model) {
    const up = `drop table if exists ${model?.schema || DB.database}.${
      model.table
    } cascade;`;
    const down = `create table if not exists ${model?.schema || DB.database}.${
      model.table
    } (
            ${DBManager.modelColumnstoSql(model)}
        );`;
    await DB.pool.query(up);
    return {
      up,
      down,
    };
  }
  static async createTable(model) {
    const up = `create table if not exists ${model?.schema || DB.database}.${
      model.table
    } (
            ${DBManager.modelColumnstoSql(model)}
        );`;
    const down = `drop table if exists ${model?.schema || DB.database}.${
      model.table
    } cascade;`;
    await DB.pool.query(up);
    return {
      up,
      down,
    };
  }
  static modelColumnstoSql(model) {
    return Object.values(model.columns || {})
      .map((column) => DBManager.modelColumnToSQL(column))
      .join(",\n");
  }
  static modelColumnToSQL(column) {
    return `"${column.column}" ${column.type} ${
      column.columnConfig?.length ? `(${column.columnConfig?.length})` : ""
    } ${DBManager.modelColumnConstraints(column)}`;
  }
  static modelColumnConstraints(column) {
    const { columnConfig } = column;
    let sql = "";
    if (columnConfig.primary) {
      sql += ` primary key `;
    }
    if (columnConfig.unique) {
      if (Array.isArray(columnConfig.unique)) {
        sql += ` unique ${columnConfig.unique.join(",")} `;
      } else {
        sql += ` unique `;
      }
    }
    if (!columnConfig.nullable) {
      sql += " not null ";
    }
    if (typeof columnConfig.defaultValue !== "undefined") {
      sql += ` default  ${columnConfig.defaultValue} `;
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

    if (columnConfig.check) {
      if (Array.isArray(columnConfig.check)) {
        sql += ` CHECK ${columnConfig.check.join(",")}`;
      } else {
        ` CHECK ${columnConfig.check}`;
      }
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
  static async createPrimaryKey(model, name, columns) {
    const fColumns = DBManager.formatConstraintOrIndexColumns(columns);
    const up = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} add constraint ${name} primary key (${fColumns.join(",")});`;
    const down = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} drop constraint ${name};`;
    await DB.pool.query(up);
    return {
      up,
      down,
    };
  }
  static async dropPrimaryKey(model, name, columns) {
    const fColumns = DBManager.formatConstraintOrIndexColumns(columns);
    const down = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} add constraint ${name} primary key (${fColumns.join(",")});`;
    const up = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} drop constraint ${name};`;
    await DB.pool.query(up);
    return {
      up,
      down,
    };
  }
  static async createForeignKey(
    fromModel,
    toModel,
    name,
    fromColumns,
    toColumns,
    onUpdate,
    onDelete
  ) {
    const fColumns = DBManager.formatConstraintOrIndexColumns(fromColumns);
    const tColumns = DBManager.formatConstraintOrIndexColumns(toColumns);

    const up = `alter table ${DBManager.toModelSchemaTableAlias(
      fromModel
    )} add constraint ${name} foreign key (${fColumns.join(
      ","
    )}) references ${DBManager.toModelSchemaTableAlias(
      toModel
    )} (${tColumns.join(",")}) ${DBManager.toForeignKeyAction(
      "update",
      onUpdate
    )} ${DBManager.toForeignKeyAction("delete", onDelete)};`;
    const down = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} drop constraint ${name};`;
    await DB.pool.query(up);
    return {
      up,
      down,
    };
  }
  static async dropForeignKey(
    fromModel,
    toModel,
    name,
    fromColumns,
    toColumns,
    onUpdate,
    onDelete
  ) {
    const fColumns = DBManager.formatConstraintOrIndexColumns(fromColumns);
    const tColumns = DBManager.formatConstraintOrIndexColumns(toColumns);

    const down = `alter table ${DBManager.toModelSchemaTableAlias(
      fromModel
    )} add constraint ${name} foreign key (${fColumns.join(
      ","
    )}) references ${DBManager.toModelSchemaTableAlias(
      toModel
    )} (${tColumns.join(",")}) ${DBManager.toForeignKeyAction(
      "update",
      onUpdate
    )} ${DBManager.toForeignKeyAction("delete", onDelete)};`;
    const up = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} drop constraint ${name};`;
    await DB.pool.query(up);
    return {
      up,
      down,
    };
  }
  static async createUniqueConstraint(model, name, columns) {
    const fColumns = DBManager.formatConstraintOrIndexColumns(columns);
    const up = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} add constraint ${name} unique (${fColumns.join(",")});`;
    const down = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} drop constraint ${name};`;
    await DB.pool.query(up);
    return {
      up,
      down,
    };
  }
  static async dropUniqueConstraint(model, name, columns) {
    const fColumns = DBManager.formatConstraintOrIndexColumns(columns);
    const down = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} add constraint ${name} unique (${fColumns.join(",")});`;
    const up = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} drop constraint ${name};`;
    await DB.pool.query(up);
    return {
      up,
      down,
    };
  }
  static async createUniqueIndex(model, name, columns) {
    const fColumns = DBManager.formatConstraintOrIndexColumns(columns);
    const up = `create unique index ${name} on ${DBManager.toModelSchemaTableAlias(
      model
    )} (${fColumns.join(",")});`;
    const down = `drop index ${
      model?.schema ? `"${model.schema}".` : ""
    }${name};`;
    await DB.pool.query(up);
    return {
      up,
      down,
    };
  }
  static async dropUniqueIndex(model, name, columns) {
    const fColumns = DBManager.formatConstraintOrIndexColumns(columns);
    const down = `create unique index ${name} on ${DBManager.toModelSchemaTableAlias(
      model
    )} (${fColumns.join(",")});`;
    const up = `drop index ${
      model?.schema ? `"${model.schema}".` : ""
    }${name};`;
    await DB.pool.query(up);
    return {
      up,
      down,
    };
  }
  static async createIndex(model, name, columns, type) {
    const fColumns = DBManager.formatConstraintOrIndexColumns(columns);
    const up = `create index ${name} on ${DBManager.toModelSchemaTableAlias(
      model
    )}   ${type ? `using ${type}` : ""} (${fColumns.join(",")});`;
    const down = `drop index ${
      model?.schema ? `"${model.schema}".` : ""
    }${name};`;
    await DB.pool.query(up);
    return {
      up,
      down,
    };
  }
  static async dropIndex(model, name, columns, type) {
    const fColumns = DBManager.formatConstraintOrIndexColumns(columns);
    const down = `create index ${name} on ${DBManager.toModelSchemaTableAlias(
      model
    )}   ${type ? `using ${type}` : ""} (${fColumns.join(",")});`;
    const up = `drop index ${
      model?.schema ? `"${model.schema}".` : ""
    }${name};`;
    await DB.pool.query(up);
    return {
      up,
      down,
    };
  }
  static toModelSchemaTableAlias(model) {
    return `${model?.schema ? `"${model.schema}".` : ""}"${model.table}"`;
  }
  static formatConstraintOrIndexColumns(columns) {
    if (!Array.isArray(columns)) {
      columns = [columns];
    }

    const formattedColumns = columns
      .filter(
        (col) => !!col && (col instanceof Column || typeof col === "string")
      )
      .map((col) => (col instanceof Column ? col.column : col));
    return formattedColumns;
  }
  static toForeignKeyAction(type, value) {
    const isValidAction =
      value &&
      ["cascade", "no action", "restrict"].indexOf(value?.toLowerCase?.()) !==
        -1;
    if (!isValidAction) {
      return "";
    }

    return `on ${type} ${value.toLowerCase()}`;
  }
}
module.exports = DBManager;
