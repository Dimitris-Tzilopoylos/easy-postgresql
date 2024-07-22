const Column = require("./column");
const DB = require("./db");
const Model = require("./model");
const Relation = require("./relation");
const fs = require("fs");
const loadTables = require("easy-pg-scanner");
const path = require("path");

class Postgres {
  constructor({
    connectionConfig,
    relations,
    options = {
      createFiles: true,
      skipIfDirectoryExists: true,
      dirname: "easy-psql-models",
      useESM: false,
      extension: "js",
    },
  }) {
    this.connectionConfig = connectionConfig;
    this.relations = Array.isArray(relations) ? relations : [];
    this.options = options;
  }

  async init() {
    if (this.connectionConfig) {
      DB.registerConnectionConfig(this.connectionConfig);
    }

    const schemas = await loadTables(DB.connectionConfig);
    // const schema = schemas.find((x) => x.schema === DB.database);

    // if (!schema) {
    //   throw new Error(`Schema ${DB.database} was not found`);
    // }
    for (const { schema } of schemas) {
      this.__makeModels(schema.tables);
    }

    if (this.options.createFiles) {
      await this.__makeModelFiles();
    }
  }

  async __makeModelFiles() {
    const modelsDirectoryPath = path.join(
      process.cwd(),
      this.options.dirname || "easy-psql-models"
    );

    const directoryAlreadyExists = fs.existsSync(modelsDirectoryPath);

    if (directoryAlreadyExists && this.options?.skipIfDirectoryExists) {
      return;
    }
    if (directoryAlreadyExists) {
      fs.rmSync(modelsDirectoryPath, { recursive: true });
    }
    fs.mkdirSync(modelsDirectoryPath);

    for (const [table, model] of Object.entries(DB.modelFactory)) {
      const fileHeader = this.__makeImportsForModel(model);
      const fileClass = this.__makeModelClass(model);
      const exportFile = this.__makeExportClass(model);
      fs.writeFileSync(
        path.join(
          modelsDirectoryPath,
          `${this.__makeTableClasseName(table)}.model.${
            this.options?.extension || "js"
          }`
        ),
        `${fileHeader}\n\n${fileClass}\n\n${exportFile};`
      );
    }
  }

  __makeTableClasseName(table) {
    return table
      .split("_")
      .map((x) => x[0].toUpperCase() + (x.slice(1) || ""))
      .join("");
  }

  __makeExportClass(model) {
    const instance = new model();
    return (
      (this.__isTypescript() || this.__isMJS()
        ? `export default `
        : "module.exports = ") + `${this.__makeTableClasseName(instance.table)}`
    );
  }

  __makeModelClass(model) {
    const instance = new model();
    return `class ${this.__makeTableClasseName(
      instance.table
    )} extends Model {\n\n\t\tconstructor(conn${
      this.__isTypescript() ? `?: any` : ""
    }) {\n\t\t\tsuper('${instance.table}', conn)\n\t\t}\n\n\t\tcolumns${
      this.__isTypescript() ? ": any" : ""
    } = {${Object.entries(instance.columns)
      .reduce((acc, [col, config], idx) => {
        acc.push(
          `${idx > 0 ? "\t\t\t" : "\n\t\t\t"}${
            col?.includes(" ") ? `"${col}"` : col
          }: new Column({\n\t\t\t\tname: "${col}",\n\t\t\t\ttype: "${
            config.columnConfig.type
          }",\n\t\t\t\tprimary: ${!!config.columnConfig
            .primary},\n\t\t\t\tnullable: ${!!config.columnConfig
            .nullable},\n\t\t\t\tunique: ${!!config.columnConfig
            .unique},\n\t\t\t\tdefaultValue: ${
            typeof config?.columnConfig.defaultValue !== "undefined" &&
            config?.columnConfig?.defaultValue
              ? `"${config.columnConfig.defaultValue}"`
              : "null"
          }\n\t\t\t})`
        );
        return acc;
      }, [])
      .join(",\n")}\n\t\t};\n\n\t\trelations${
      this.__isTypescript() ? ": any" : ""
    } = {${Object.entries(instance.relations || {})
      .reduce((acc, [relation, config], idx) => {
        acc.push(
          `${
            idx > 0 ? "\t\t\t" : "\n\t\t\t"
          }${relation}: new Relation({\n\t\t\t\talias: "${
            config.alias
          }",\n\t\t\t\ttype: "${config.type.toLowerCase()}",\n\t\t\t\tfrom_table: "${
            config.from_table
          }",\n\t\t\t\tfrom_column: "${
            config.from_column
          }",\n\t\t\t\tto_table: "${config.to_table}",\n\t\t\t\tto_column: "${
            config.to_column
          }"\n\t\t\t})`
        );
        return acc;
      }, [])
      .join(",\n")}\n\t\t};\n\n};`
      .split("\t")
      .join(" ");
  }

  __makeImportsForModel(model) {
    const instance = new model();
    const hasRelationClass = Object.keys(instance.relations).length > 0;
    if (this.options.useESM) {
      return `import { Model, Column${
        hasRelationClass ? `, Relation` : ""
      } } from 'easy-psql'`;
    }

    return `const { Model, Column${
      hasRelationClass ? `, Relation` : ""
    } } = require('easy-psql');`;
  }

  __isTypescript() {
    return this.options?.extension === "ts";
  }

  __isMJS() {
    return this.options?.extension === "mjs";
  }

  __makeModels(tables, schema) {
    DB.models = {};
    DB.modelFactory = {};
    for (const table of tables || []) {
      const model = this._makeModel(table, schema);
      DB.register(model);
    }
  }

  _makeModel(config, schema) {
    const { table, columns, foreignKeys } = config;
    const modelColumns = columns.reduce(
      (acc, col) => ({ ...acc, [col.name]: new Column(col) }),
      {}
    );

    const relations = (foreignKeys || []).reduce((acc, fk) => {
      acc[fk.referenced_table] = new Relation({
        alias: fk.referenced_table,
        from_table: fk.column_table,
        from_column: fk.column_name,
        to_table: fk.referenced_table,
        to_column: fk.referenced_column,
        type: "array",
        schema,
      });

      return acc;
    }, {});

    const allRelations = this.relations
      .filter((x) => x?.from_table === table)
      .reduce((acc, r) => {
        if (r instanceof Relation) {
          acc[r.alias] = r;
        } else {
          acc[r.alias] = new Relation({
            alias: r.alias,
            from_table: r.from_table,
            from_column: r.from_column,
            to_table: r.to_table,
            to_column: r.to_column,
            schema: r?.schema || schema,
            type:
              ["object", "array"].indexOf(
                typeof r?.type === "string" ? r?.type?.toLowerCase() : "array"
              ) !== -1
                ? r.type.toLowerCase()
                : "array",
          });
        }

        return acc;
      }, relations);

    return class BaseModel extends Model {
      constructor(connection) {
        super(table, connection, schema || "public");
      }
      columns = modelColumns;

      relations = allRelations;
    };
  }

  // handlers

  model(table, connection, schema = "public") {
    const model = DB.modelFactory[schema][table];
    if (!model) {
      throw new Error(`Model for table <${schema}.${table}> was not found`);
    }
    const instance = new model(connection);
    return {
      find: instance.find.bind(instance),
      findOne: instance.findOne.bind(instance),
      create: instance.create.bind(instance),
      createMany: instance.createMany.bind(instance),
      createTX: instance.createTX.bind(instance),
      createManyTX: instance.createManyTX.bind(instance),
      update: instance.update.bind(instance),
      delete: instance.delete.bind(instance),
      withTransaction: instance.withTransaction.bind(instance),
      aggregate: instance.aggregate.bind(this),
      instance,
    };
  }

  async withConnection(cb) {
    let connection;
    try {
      connection = await this.pool().connect();
      const result = await cb(connection);
      if (result instanceof Error) {
        throw result;
      }
      connection.release();
      connection = null;
      return result;
    } catch (error) {
      if (connection) {
        connection.release();
      }
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  pool() {
    return DB.pool;
  }

  enablePOSTGIS(value) {
    DB.enablePOSTGIS(value);
  }

  async query(sql, args, connection) {
    if (connection) {
      return connection.query(sql, args);
    }
    return DB.pool.query(sql, args);
  }
}

module.exports = Postgres;
