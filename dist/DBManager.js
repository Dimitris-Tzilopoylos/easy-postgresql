"use strict";

const Column = require("./column");
const DB = require("./db");
const prompt = require("prompt-sync")({
  sigint: true,
});
class DBManager {
  static async createSchema(schemaName, connection, existsCheck = true) {
    const up = `create schema ${
      existsCheck ? "if not exists" : ""
    } ${schemaName};`;
    const down = `drop schema ${
      existsCheck ? "if exists" : ""
    } ${schemaName} cascade;`;
    await (connection || DB.pool).query(up);
    return {
      up,
      down,
    };
  }
  static async dropSchema(schemaName, connection, existsCheck = true) {
    const up = `drop schema ${
      existsCheck ? "if exists" : ""
    } ${schemaName} cascade;`;
    const down = `create schema ${
      existsCheck ? "if not exists" : ""
    } ${schemaName};`;
    await (connection || DB.pool).query(up);
    return {
      up,
      down,
    };
  }
  static async dropTable(model, connection, existsCheck = true) {
    const up = `drop table ${existsCheck ? "if exists" : ""} ${
      model?.schema || DB.database
    }.${model.table} cascade;`;
    const down = `create table ${existsCheck ? "if not exists" : ""} ${
      model?.schema || DB.database
    }.${model.table} (
            ${DBManager.modelColumnstoSql(model)}
        );`;
    await (connection || DB.pool).query(up);
    return {
      up,
      down,
    };
  }
  static async createTable(model, connection, existsCheck = true) {
    const up = `create table ${existsCheck ? "if not exists" : ""} ${
      model?.schema || DB.database
    }.${model.table} (
            ${DBManager.modelColumnstoSql(model)}
        );`;
    const down = `drop table ${existsCheck ? "if exists" : ""} ${
      model?.schema || DB.database
    }.${model.table} cascade;`;
    await (connection || DB.pool).query(up);
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

    if (column?.checks) {
      if (Array.isArray(column?.checks) && column?.checks?.length) {
        sql += ` CHECK (${column?.checks.join(",")})`;
      } else {
        ` CHECK (${column?.checks})`;
      }
    }
    return sql;
  }
  static createIndexes(model) {
    throw new Error("Not implemented");
    let up = ``;
    const primaryIndexes = Object.entries(model?.indexes?.primary || {});
    const foreignIndexes = Object.entries(model?.indexes?.foreign || {});
    const uniqueIndexes = Object.entries(model?.indexes?.unique || {});
    switch (type.toLowerCase()) {
      case "primary":
        up = `ALTER TABLE ${DB.database}.${model.table} ALTER column ${model} `;
    }
  }
  static async exec(sql, args = [], connection) {
    await (connection || DB.pool).query(sql, args);
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
  static async createPrimaryKey(model, name, columns, connection) {
    const fColumns = DBManager.formatConstraintOrIndexColumns(columns);
    const up = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} add constraint ${name} primary key (${fColumns.join(",")});`;
    const down = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} drop constraint ${name};`;
    await (connection || DB.pool).query(up);
    return {
      up,
      down,
    };
  }
  static async dropPrimaryKey(model, name, columns, connection) {
    const fColumns = DBManager.formatConstraintOrIndexColumns(columns);
    const down = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} add constraint ${name} primary key (${fColumns.join(",")});`;
    const up = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} drop constraint ${name};`;
    await (connection || DB.pool).query(up);
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
    onDelete,
    connection
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
      fromModel
    )} drop constraint ${name};`;
    await (connection || DB.pool).query(up);
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
    onDelete,
    connection
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
      fromModel
    )} drop constraint ${name};`;
    await (connection || DB.pool).query(up);
    return {
      up,
      down,
    };
  }
  static async createUniqueConstraint(model, name, columns, connection) {
    const fColumns = DBManager.formatConstraintOrIndexColumns(columns);
    const up = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} add constraint ${name} unique (${fColumns.join(",")});`;
    const down = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} drop constraint ${name};`;
    await (connection || DB.pool).query(up);
    return {
      up,
      down,
    };
  }
  static async dropUniqueConstraint(model, name, columns, connection) {
    const fColumns = DBManager.formatConstraintOrIndexColumns(columns);
    const down = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} add constraint ${name} unique (${fColumns.join(",")});`;
    const up = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} drop constraint ${name};`;
    await (connection || DB.pool).query(up);
    return {
      up,
      down,
    };
  }
  static async createUniqueIndex(model, name, columns, connection) {
    const fColumns = DBManager.formatConstraintOrIndexColumns(columns);
    const up = `create unique index ${name} on ${DBManager.toModelSchemaTableAlias(
      model
    )} (${fColumns.join(",")});`;
    const down = `drop index ${
      model?.schema ? `"${model.schema}".` : ""
    }${name};`;
    await (connection || DB.pool).query(up);
    return {
      up,
      down,
    };
  }
  static async dropUniqueIndex(model, name, columns, connection) {
    const fColumns = DBManager.formatConstraintOrIndexColumns(columns);
    const down = `create unique index ${name} on ${DBManager.toModelSchemaTableAlias(
      model
    )} (${fColumns.join(",")});`;
    const up = `drop index ${
      model?.schema ? `"${model.schema}".` : ""
    }${name};`;
    await (connection || DB.pool).query(up);
    return {
      up,
      down,
    };
  }
  static async createIndex(model, name, columns, type, connection) {
    const fColumns = DBManager.formatConstraintOrIndexColumns(columns);
    const up = `create index ${name} on ${DBManager.toModelSchemaTableAlias(
      model
    )}   ${type ? `using ${type}` : ""} (${fColumns.join(",")});`;
    const down = `drop index ${
      model?.schema ? `"${model.schema}".` : ""
    }${name};`;
    await (connection || DB.pool).query(up);
    return {
      up,
      down,
    };
  }
  static async dropIndex(model, name, columns, type, connection) {
    const fColumns = DBManager.formatConstraintOrIndexColumns(columns);
    const down = `create index ${name} on ${DBManager.toModelSchemaTableAlias(
      model
    )}   ${type ? `using ${type}` : ""} (${fColumns.join(",")});`;
    const up = `drop index ${
      model?.schema ? `"${model.schema}".` : ""
    }${name};`;
    await (connection || DB.pool).query(up);
    return {
      up,
      down,
    };
  }
  static async addCheckConstraint(model, name, sql, connection) {
    const up = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} add constraint ${name} check (${sql});`;
    const down = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} drop constraint ${name};`;
    await (connection || DB.pool).query(up);
    return {
      up,
      down,
    };
  }
  static async dropCheckConstraint(model, name, sql, connection) {
    const down = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} add constraint ${name} check (${sql});`;
    const up = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} drop constraint ${name};`;
    await (connection || DB.pool).query(up);
    return {
      up,
      down,
    };
  }
  static async addColumn(model, column, connection) {
    const up = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} add column ${DBManager.modelColumnToSQL(column)};`;
    const down = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} drop column "${column.column}";`;
    await (connection || DB.pool).query(up);
    return {
      up,
      down,
    };
  }
  static async dropColumn(model, column, connection) {
    const down = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} add column ${DBManager.modelColumnToSQL(column)};`;
    const up = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} drop column "${column.column}";`;
    await (connection || DB.pool).query(up);
    return {
      up,
      down,
    };
  }
  static async renameColumn(model, column, newName, connection) {
    const up = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} rename column "${column.column}" to "${newName}";`;
    const down = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} rename column "${newName}" to "${column.column}";`;
    await (connection || DB.pool).query(up);
    return {
      up,
      down,
    };
  }
  static async setColumnDefaultValue(model, column, defaultValue, connection) {
    const up = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} alter column "${column.column}" set default ${defaultValue};`;

    let down = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} alter column "${column.column}" drop default;`;
    if (typeof column.columnConfig.defaultValue !== "undefined") {
      down = `alter table ${DBManager.toModelSchemaTableAlias(
        model
      )} alter column "${column.column}" set default ${
        column.columnConfig.defaultValue
      };`;
    }
    await (connection || DB.pool).query(up);
    return {
      up,
      down,
    };
  }
  static async dropColumnDefaultValue(model, column, connection) {
    let down = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} alter column "${column.column}" set default ${defaultValue};`;
    const up = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} alter column "${column.column}" drop default;`;
    if (typeof column.columnConfig.defaultValue !== "undefined") {
      down = `alter table ${DBManager.toModelSchemaTableAlias(
        model
      )} alter column "${column.column}" set default ${
        column.columnConfig.defaultValue
      };`;
    }
    await (connection || DB.pool).query(up);
    return {
      up,
      down,
    };
  }
  static async setColumnNotNullable(model, column, connection) {
    let down = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} alter column "${column.column}" drop not null;`;

    const up = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} alter column "${column.column}" set not null;`;
    if (
      typeof column.columnConfig.nullable !== "undefined" &&
      column.columnConfig.nullable
    ) {
      down = up;
    }
    await (connection || DB.pool).query(up);
    return {
      up,
      down,
    };
  }
  static async setColumnNullable(model, column, connection) {
    const up = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} alter column "${column.column}" drop not null;`;

    let down = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} alter column "${column.column}" set not null;`;
    if (
      typeof column.columnConfig.nullable !== "undefined" &&
      column.columnConfig.nullable
    ) {
      down = up;
    }
    await (connection || DB.pool).query(up);
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
