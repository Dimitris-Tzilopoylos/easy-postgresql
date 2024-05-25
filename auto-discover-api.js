const Column = require("./column");
const DB = require("./db");
const Model = require("./model");
const Relation = require("./relation");
const fs = require("fs");
const loadTables = require("easy-pg-scanner");
const path = require("path");
 
class AutoDiscoverApi {
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
    const schema = schemas.find((x) => x.schema === DB.database);

    if (!schema) {
      throw new Error(`Schema ${DB.database} was not found`);
    }

    this.__makeModels(schema.tables);

    if (this.options.createFiles) {
      await this.__makeModelFiles();
    }

    // const keys = schema.tables.find((table) => table.foreignKeys.length > 0);

    // console.log(keys);
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
          `${this.__makeTableClasseName(table)}.model.${this.options?.extension || "js"}`
        ),
       `${fileHeader}\n\n${fileClass}\n\n${exportFile};`
      );
    }
  }

  __makeTableClasseName(table) {
    return table.split('_').map(x => x[0].toUpperCase()+(x.slice(1) || '')).join('')
  }

  __makeExportClass(model) {
    const instance = new model();
    return (
      (this.__isTypescript() || this.__isMJS()
        ? `export default `
        : "module.exports = ") +
      `${this.__makeTableClasseName(instance.table)}`
    );
  }

  __makeModelClass(model) {
    const instance = new model();
    return `class ${this.__makeTableClasseName(instance.table)} extends Model {\n\n\t\tconstructor(conn${this.__isTypescript() ? `?: any` : ""}) {\n\t\t\tsuper('${instance.table}', conn)\n\t\t}\n\n\t\tcolumns${this.__isTypescript() ? ": any" : ""} = {${Object.entries(
          instance.columns
        )
          .reduce((acc, [col, config], idx) => {
            acc.push(`${idx > 0 ? "\t\t\t" : "\n\t\t\t"}${
              col?.includes(" ") ? `"${col}"` : col
            }: new Column({\n\t\t\t\tname: "${col}",\n\t\t\t\ttype: "${config.columnConfig.type}",\n\t\t\t\tprimary: ${!!config.columnConfig.primary},\n\t\t\t\tnullable: ${!!config.columnConfig.nullable},\n\t\t\t\tunique: ${!!config.columnConfig.unique},\n\t\t\t\tdefaultValue: ${
                      typeof config?.columnConfig.defaultValue !==
                        "undefined" && config?.columnConfig?.defaultValue
                        ? `"${config.columnConfig.defaultValue}"`
                        : "null"
                    }\n\t\t\t})`);
            return acc;
          }, [])
          .join(",\n")}\n\t\t};\n\n\t\trelations${this.__isTypescript() ? ": any" : ""} = {${Object.entries(
          instance.relations || {}
        )
          .reduce((acc, [relation, config], idx) => {
            acc.push(`${idx > 0 ? "\t\t\t" : "\n\t\t\t"}${
              relation
            }: new Relation({\n\t\t\t\talias: "${config.alias}",\n\t\t\t\ttype: "${config.type.toLowerCase()}",\n\t\t\t\tfrom_table: "${config.from_table}",\n\t\t\t\tfrom_column: "${config.from_column}",\n\t\t\t\tto_table: "${config.to_table}",\n\t\t\t\tto_column: "${config.to_column}"\n\t\t\t})`);
            return acc;
          }, [])
          .join(",\n")}\n\t\t};\n\n};`.split('\t').join(' ');
  }

  __makeImportsForModel(model) {
    const instance = new model();
    const hasRelationClass = Object.keys(instance.relations).length > 0;
    if (this.options.useESM) {
      return `import { Model, Column${hasRelationClass ? `, Relation` : ""} } from 'easy-psql'`;
    }

    return `const { Model, Column${hasRelationClass ? `, Relation` : "" } } = require('easy-psql');`;
  }

  __isTypescript() {
    return this.options?.extension === "ts";
  }

  __isMJS() {
    return this.options?.extension === "mjs";
  }

  __makeModels(tables) {
    DB.models = {};
    DB.modelFactory = {};
    for (const table of tables || []) {
      const model = this._makeModel(table, tables);
      DB.register(model);
    }
  }

  _makeModel(config, tables) {
    const { table, columns, foreignKeys } = config;
    // console.log(foreignKeys);
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
        super(table, connection);
      }
      columns = modelColumns;

      relations = allRelations;
    };
  }
}

const db = new AutoDiscoverApi({
  connectionConfig: {
    schema: "ecom",
    user: "postgres",
    port: 5435,
    password: "postgres",
  },
  relations: [
    new Relation({
      alias: "brand",
      from_table: "products",
      from_column: "brand_id",
      to_table: "brands",
      to_column: "id",
      type: "object",
    }),
  ],
  options: {
    skipIfDirectoryExists: false,
    dirname: "models",
    extension: "ts",
    useESM: false,
    createFiles: true,
  },
});

db.init().then(async () => {});
