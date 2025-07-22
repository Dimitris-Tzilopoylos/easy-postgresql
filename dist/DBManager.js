"use strict";

const Column = require("./column");
const DB = require("./db");
const prompt = require("prompt-sync")({
  sigint: true,
});
class DBManager {
  static async alterSchemaOwner(schemaName, owner, connection) {
    const up = `alter schema "${schemaName}" owner to ${owner};`;
    await (connection || DB.pool).query(up);
    return {
      up,
      down: `-- No down migration for alterSchemaOwner("${schemaName}",${owner})`,
    };
  }
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
  static async alterTableOwner(model, owner, connection) {
    const up = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} owner to ${owner};`;
    await (connection || DB.pool).query(up);
    return {
      up,
      down: `-- No down migration for alterTableOwner(${DBManager.toModelSchemaTableAlias(
        model
      )},${owner})`,
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
  static async enableRLS(model, connection) {
    const up = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} enable row level security;`;

    let down = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} disable row level security;`;

    await (connection || DB.pool).query(up);
    return {
      up,
      down,
    };
  }
  static async disableRLS(model, connection) {
    const down = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} enable row level security;`;

    let up = `alter table ${DBManager.toModelSchemaTableAlias(
      model
    )} disable row level security;`;

    await (connection || DB.pool).query(up);
    return {
      up,
      down,
    };
  }
  static async enableSchemaRLS(schema, connection) {
    const registeredModels = DB.modelFactory[schema];
    if (
      DB.isObject(registeredModels) &&
      Object.values(registeredModels).length
    ) {
      const results = [];
      for (const model of Object.values(registeredModels)) {
        const result = await DBManager.enableRLS(new model(), connection);
        results.push(result);
      }

      return {
        up: results.map((item) => item.up).join("\n"),
        down: results.map((item) => item.down).join("\n"),
      };
    }

    return {
      up: "",
      down: "",
    };
  }
  static async disableSchemaRLS(schema, connection) {
    const registeredModels = DB.modelFactory[schema];
    if (
      DB.isObject(registeredModels) &&
      Object.values(registeredModels).length
    ) {
      const results = [];
      for (const model of Object.values(registeredModels)) {
        const result = await DBManager.disableRLS(new model(), connection);
        results.push(result);
      }

      return {
        up: results.map((item) => item.up).join("\n"),
        down: results.map((item) => item.down).join("\n"),
      };
    }

    return {
      up: "",
      down: "",
    };
  }
  static selectPolicy(name, model, options, connection) {
    const roles =
      options?.roles && Array.isArray(options.roles) && options.roles.length > 0
        ? `to ${options.roles.join(", ")}`
        : "";
    const using =
      options?.using && typeof options.using === "string"
        ? options.using.startsWith("(")
          ? options.using
          : `(${options.using})`
        : "(true)";
    let up = `create policy ${name} on ${DBManager.toModelSchemaTableAlias(
      model
    )} for select ${roles} using ${using};`;
    let down = `drop policy ${name} on ${DBManager.toModelSchemaTableAlias(
      model
    )};`;
    return {
      create: async () => {
        await (connection || DB.pool).query(up);
        return {
          up,
          down,
        };
      },
      drop: async () => {
        await (connection || DB.pool).query(down);
        return {
          up: down,
          down: up,
        };
      },
    };
  }
  static insertPolicy(name, model, options, connection) {
    const roles =
      options?.roles && Array.isArray(options.roles) && options.roles.length > 0
        ? `to ${options.roles.join(", ")}`
        : "";

    const using =
      options?.using && typeof options.using === "string"
        ? options.using.startsWith("(")
          ? options.using
          : `(${options.using})`
        : "";

    const check =
      options?.check && typeof options.check === "string"
        ? options.check.startsWith("(")
          ? options.check
          : `(${options.check})`
        : "";
    const kind =
      options?.kind === "restrictive"
        ? "as restrictive"
        : options?.kind === "permissive"
        ? "as permissive"
        : "";
    const usingClause = using ? ` using ${using}` : "";
    const checkClause = check ? ` with check ${check}` : "";

    const tableRef = DBManager.toModelSchemaTableAlias(model);

    const up = `create policy ${name} on ${tableRef} for insert ${kind} ${roles} ${usingClause} ${checkClause};`;
    const down = `drop policy ${name} on ${tableRef};`;

    return {
      create: async () => {
        await (connection || DB.pool).query(up);
        return { up, down };
      },
      drop: async () => {
        await (connection || DB.pool).query(down);
        return { up: down, down: up };
      },
    };
  }
  static updatePolicy(name, model, options, connection) {
    const roles =
      options?.roles && Array.isArray(options.roles) && options.roles.length > 0
        ? `to ${options.roles.join(", ")}`
        : "";

    const using =
      options?.using && typeof options.using === "string"
        ? options.using.startsWith("(")
          ? options.using
          : `(${options.using})`
        : "";

    const check =
      options?.check && typeof options.check === "string"
        ? options.check.startsWith("(")
          ? options.check
          : `(${options.check})`
        : "";
    const kind =
      options?.kind === "restrictive"
        ? "as restrictive"
        : options?.kind === "permissive"
        ? "as permissive"
        : "";

    const usingClause = using ? ` using ${using}` : "";
    const checkClause = check ? ` with check ${check}` : "";

    const tableRef = DBManager.toModelSchemaTableAlias(model);

    const up = `create policy ${name} on ${tableRef} for update ${kind} ${roles} ${usingClause} ${checkClause};`;
    const down = `drop policy ${name} on ${tableRef};`;

    return {
      create: async () => {
        await (connection || DB.pool).query(up);
        return { up, down };
      },
      drop: async () => {
        await (connection || DB.pool).query(down);
        return { up: down, down: up };
      },
    };
  }
  static deletePolicy(name, model, options, connection) {
    const roles =
      options?.roles && Array.isArray(options.roles) && options.roles.length > 0
        ? `to ${options.roles.join(", ")}`
        : "";

    const using =
      options?.using && typeof options.using === "string"
        ? options.using.startsWith("(")
          ? options.using
          : `(${options.using})`
        : "";

    const kind =
      options?.kind === "restrictive"
        ? "as restrictive"
        : options?.kind === "permissive"
        ? "as permissive"
        : "";

    const usingClause = using ? ` using ${using}` : "";

    const tableRef = DBManager.toModelSchemaTableAlias(model);

    const up = `create policy ${name} on ${tableRef} for delete ${kind} ${roles} ${usingClause};`;
    const down = `drop policy ${name} on ${tableRef};`;

    return {
      create: async () => {
        await (connection || DB.pool).query(up);
        return { up, down };
      },
      drop: async () => {
        await (connection || DB.pool).query(down);
        return { up: down, down: up };
      },
    };
  }
  static allPolicy(name, model, options, connection) {
    const roles =
      options?.roles && Array.isArray(options.roles) && options.roles.length > 0
        ? `to ${options.roles.join(", ")}`
        : "";

    const using =
      options?.using && typeof options.using === "string"
        ? options.using.startsWith("(")
          ? options.using
          : `(${options.using})`
        : "";

    const check =
      options?.check && typeof options.check === "string"
        ? options.check.startsWith("(")
          ? options.check
          : `(${options.check})`
        : "";

    const kind =
      options?.kind === "restrictive"
        ? "as restrictive"
        : options?.kind === "permissive"
        ? "as permissive"
        : "";

    const usingClause = using ? ` using ${using}` : "";
    const checkClause = check ? ` with check ${check}` : "";

    const tableRef = DBManager.toModelSchemaTableAlias(model);

    const up = `create policy ${name} on ${tableRef} for all ${kind} ${roles} ${usingClause} ${checkClause};`;
    const down = `drop policy ${name} on ${tableRef};`;

    return {
      create: async () => {
        await (connection || DB.pool).query(up);
        return { up, down };
      },
      drop: async () => {
        await (connection || DB.pool).query(down);
        return { up: down, down: up };
      },
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
  static async createRole(roleName, options = {}, connection) {
    const clauses = [];

    if (options?.login) clauses.push("LOGIN");
    if (options?.noLogin) clauses.push("NOLOGIN");
    if (options?.password) clauses.push(`PASSWORD '${options.password}'`);

    if (options?.superuser) clauses.push("SUPERUSER");
    if (options?.noSuperuser) clauses.push("NOSUPERUSER");

    if (options?.createdb) clauses.push("CREATEDB");
    if (options?.noCreatedb) clauses.push("NOCREATEDB");

    if (options?.createrole) clauses.push("CREATEROLE");
    if (options?.noCreaterole) clauses.push("NOCREATEROLE");

    if (options?.inherit === false) clauses.push("NOINHERIT");
    if (options?.inherit === true) clauses.push("INHERIT");

    if (options?.replication) clauses.push("REPLICATION");
    if (options?.bypassrls) clauses.push("BYPASSRLS");

    if (typeof options?.connectionLimit === "number")
      clauses.push(`CONNECTION LIMIT ${options.connectionLimit}`);

    if (options?.validUntil) {
      clauses.push(`VALID UNTIL '${options.validUntil}'`);
    }

    if (Array.isArray(options?.inRole) && options.inRole.length > 0) {
      clauses.push(`IN ROLE ${options.inRole.join(", ")}`);
    }

    if (Array.isArray(options?.role) && options.role.length > 0) {
      clauses.push(`ROLE ${options.role.join(", ")}`);
    }

    if (Array.isArray(options?.admin) && options.admin.length > 0) {
      clauses.push(`ADMIN ${options.admin.join(", ")}`);
    }

    const up = `CREATE ROLE ${roleName} ${clauses.join(" ")};`;
    const down = `DROP ROLE IF EXISTS ${roleName};`;
    await (connection || DB.pool).query(up);
    return { up, down };
  }
  static async dropRole(roleName, connection) {
    const up = `DROP ROLE IF EXISTS ${roleName};`;
    const down = `CREATE ROLE ${roleName};`; // minimal rollback
    await (connection || DB.pool).query(up);
    return { up, down };
  }
  static async grantRole(toRole, fromRole, connection) {
    const up = `GRANT ${fromRole} TO ${toRole};`;
    const down = `REVOKE ${fromRole} FROM ${toRole};`;
    await (connection || DB.pool).query(up);
    return { up, down };
  }
  static async revokeRole(toRole, fromRole, connection) {
    const down = `GRANT ${fromRole} TO ${toRole};`;
    const up = `REVOKE ${fromRole} FROM ${toRole};`;
    await (connection || DB.pool).query(up);
    return { up, down };
  }
  static async grantPrivileges(role, privileges, model, connection) {
    const up = `GRANT ${privileges.join(
      ", "
    )} ON ${DBManager.toModelSchemaTableAlias(model)} TO ${role};`;
    const down = `REVOKE ${privileges.join(
      ", "
    )} ON ${DBManager.toModelSchemaTableAlias(model)} FROM ${role};`;
    await (connection || DB.pool).query(up);
    return { up, down };
  }
  static async revokePrivileges(role, privileges, model, connection) {
    const down = `GRANT ${privileges.join(
      ", "
    )} ON ${DBManager.toModelSchemaTableAlias(model)} TO ${role};`;
    const up = `REVOKE ${privileges.join(
      ", "
    )} ON ${DBManager.toModelSchemaTableAlias(model)} FROM ${role};`;
    await (connection || DB.pool).query(up);
    return { up, down };
  }
  static async alterRole(roleName, options, connection) {
    const clauses = [];

    if (typeof options?.login === "boolean")
      clauses.push(options.login ? "LOGIN" : "NOLOGIN");

    if (typeof options?.superuser === "boolean")
      clauses.push(options.superuser ? "SUPERUSER" : "NOSUPERUSER");

    if (typeof options?.createdb === "boolean")
      clauses.push(options.createdb ? "CREATEDB" : "NOCREATEDB");

    if (typeof options.createrole === "boolean")
      clauses.push(options.createrole ? "CREATEROLE" : "NOCREATEROLE");

    if (typeof options?.inherit === "boolean")
      clauses.push(options.inherit ? "INHERIT" : "NOINHERIT");

    if (typeof options?.bypassrls === "boolean")
      clauses.push(options.bypassrls ? "BYPASSRLS" : "NOBYPASSRLS");

    if (typeof options?.replication === "boolean")
      clauses.push(options.replication ? "REPLICATION" : "NOREPLICATION");

    if (typeof options?.connectionLimit === "number")
      clauses.push(`CONNECTION LIMIT ${options.connectionLimit}`);

    if (typeof options?.validUntil === "string")
      clauses.push(`VALID UNTIL '${options.validUntil}'`);

    if (typeof options?.password === "string")
      clauses.push(`PASSWORD '${options.password}'`);

    const up = `ALTER ROLE ${roleName} ${clauses.join(" ")};`;
    const down = `-- No down migration for ALTER ROLE ${roleName}`;
    await (connection || DB.pool).query(up);
    return { up, down };
  }
  static async createSequence(sequenceName, options, connection) {
    const qualifiedName = options?.schema
      ? `${options.schema}.${sequenceName}`
      : sequenceName;

    const clauses = [];
    if (options?.increment !== undefined)
      clauses.push(`INCREMENT BY ${options.increment}`);
    if (options?.minValue !== undefined)
      clauses.push(
        options.minValue === null
          ? "NO MINVALUE"
          : `MINVALUE ${options.minValue}`
      );
    if (options?.maxValue !== undefined)
      clauses.push(
        options.maxValue === null
          ? "NO MAXVALUE"
          : `MAXVALUE ${options.maxValue}`
      );
    if (options?.start !== undefined)
      clauses.push(`START WITH ${options.start}`);
    if (options?.cache !== undefined) clauses.push(`CACHE ${options.cache}`);
    if (options?.cycle) clauses.push("CYCLE");
    else clauses.push("NO CYCLE");

    const up = `CREATE SEQUENCE ${qualifiedName} ${clauses.join(" ")};`;
    const down = `DROP SEQUENCE IF EXISTS ${qualifiedName};`;
    await (connection || DB.pool).query(up);
    return { up, down };
  }
  static async dropSequence(sequenceName, schema, connection) {
    const qualifiedName = schema ? `${schema}.${sequenceName}` : sequenceName;

    const up = `DROP SEQUENCE IF EXISTS ${qualifiedName};`;
    const down = `CREATE SEQUENCE ${qualifiedName};`; // minimal rollback
    await (connection || DB.pool).query(up);
    return { up, down };
  }
  static async alterSequence(sequenceName, options, connection) {
    const clauses = [];

    if (options?.incrementBy !== undefined)
      clauses.push(`INCREMENT BY ${options.incrementBy}`);
    if (options?.minValue !== undefined)
      clauses.push(`MINVALUE ${options.minValue}`);
    if (options?.noMinValue) clauses.push(`NO MINVALUE`);
    if (options.maxValue !== undefined)
      clauses.push(`MAXVALUE ${options.maxValue}`);
    if (options?.noMaxValue) clauses.push(`NO MAXVALUE`);
    if (options.restartWith !== undefined)
      clauses.push(`RESTART WITH ${options.restartWith}`);
    if (options?.cache !== undefined) clauses.push(`CACHE ${options.cache}`);
    if (options.cycle !== undefined)
      clauses.push(options.cycle ? `CYCLE` : `NO CYCLE`);

    const ownerClause = options?.owner
      ? `ALTER SEQUENCE ${sequenceName} OWNER TO ${options.owner};`
      : null;

    const upClauses = clauses.length
      ? `ALTER SEQUENCE ${sequenceName} ${clauses.join(" ")};`
      : "";
    const up = [upClauses, ownerClause].filter(Boolean).join("\n");

    // For down migration, we usually can't revert properties without prior state, so we provide a no-op or comment
    const down = `-- No down migration for ALTER SEQUENCE ${sequenceName}`;

    await (connection || DB.pool).query(up);
    return { up, down };
  }
}
module.exports = DBManager;
