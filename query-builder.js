class QueryBuilder {
  query = "";
  queryConfig = [];
  schema = "";
  schemaStr = "";
  argsIndex = 1;
  qArgs = [];
  driver;
  bindingOperatorToSQL = { and: "and", or: "or" };
  inArrayOperatorByDriver = {
    postgres: {
      in: " = any",
      any: " = any",
      nany: " <> any",
      all: " = all",
      nin: " <> all",
      in_array: " = any ",
      nin_array: " <> any ",
    },
    mysql: {
      in: "in",
      nin: "not in",
    },
  };
  driverToPlaceholderMap = {
    postgres: (index) => `$${index}`,
    mysql: (index) => "?",
  };

  constructor(schema = "", driver = "postgres", table = "", prevIndex = 1) {
    this.table = table;
    if (schema) {
      this.schema = `${schema}`;
      this.schemaStr = `${schema}.`;
    }
    this.andalias = "";
    this.driver = driver || "postgres";
    if (["postgres", "mysql"].indexOf(driver) === -1) {
      throw new Error("please use postgres or mysql as the driver");
    }
    this.argsIndex = prevIndex;
    this.driverToPlaceholderMap = {
      postgres: () => {
        return `$${this.argsIndex++}`;
      },
      mysql: () => "?",
    };
    this.inArrayOperator = this.inArrayOperatorByDriver[this.driver];
  }

  select(...columns) {
    const from = this.queryConfig.find((x) => x.type === "from");
    let alias = "";
    if (from) {
      alias = `${from.alias || from.table}.`;
    }

    const config = {
      priority: 0,
      parts: [],
      type: "select",
    };
    config.parts.push("select");
    if (!columns?.length) {
      config.parts.push(`${alias}*`);
    } else {
      config.parts = config.parts.concat(
        columns.map((x) => {
          if (typeof x === "function") {
            const y = x(this, alias);
            return this.resolveColumnName(y, alias);
          }
          return this.resolveColumnName(x, alias);
        })
      );
    }
    config.sql = `${config.parts[0]} ${config.parts.slice(1).join(",")}`;

    this.queryConfig.push(config);

    return this;
  }

  from(table, alias) {
    const config = {
      table,
      alias,
      type: "from",
      parts: [`from ${this.schemaStr}${table}`],
      priority: 1,
      sql: `from ${this.schemaStr}${table}`,
    };
    this.alias = alias || "";
    this.queryConfig.push(config);

    return this;
  }

  where(...args) {
    const config = {
      type: "where",
      args,
      parts: ["where"],
      sql: "where",
    };
    const resolved = args.map((x) => {
      if (typeof x === "function") {
        const y = x(this);
        return this.resolveOperator(y, y?.type);
      }
      return this.resolveOperator(x, x?.type);
    });
    config.parts.push(...resolved);
    config.sql =
      config.sql +
      " " +
      [resolved[0], resolved.slice(1).join(" and ")]
        .filter(Boolean)
        .join(" and ");
    this.queryConfig.push(config);
    return this;
  }

  column(name, alias) {
    return {
      sql: `${alias ? `${alias}.` : ""}${name}`,
      args: null,
      $$$isColumn: true,
    };
  }

  is(...args) {
    return {
      sql: args
        .map((x) => {
          if (typeof x === "function") {
            const y = x(this);
            return this.resolveOperator(y, y?.type);
          }
          return this.resolveOperator(x);
        })
        .join(" is "),
      resolved: true,
    };
  }

  isNot(...args) {
    return {
      sql: args
        .map((x) => {
          if (typeof x === "function") {
            const y = x(this);
            return this.resolveOperator(y, y?.type);
          }
          return this.resolveOperator(x);
        })
        .join(" is not "),
      resolved: true,
    };
  }

  eq(...args) {
    return {
      sql: args
        .map((x) => {
          if (typeof x === "function") {
            const y = x(this);
            return this.resolveOperator(y, y?.type);
          }
          return this.resolveOperator(x);
        })
        .join(" = "),
      resolved: true,
    };
  }

  neq(...args) {
    return {
      sql: args
        .map((x) => {
          if (typeof x === "function") {
            const y = x(this);
            return this.resolveOperator(y, y?.type);
          }
          return this.resolveOperator(x);
        })
        .join(" <> "),
      resolved: true,
    };
  }

  gt(...args) {
    return {
      sql: args
        .map((x) => {
          if (typeof x === "function") {
            const y = x(this);
            return this.resolveOperator(y, y?.type);
          }
          return this.resolveOperator(x);
        })
        .join(" > "),
      resolved: true,
    };
  }

  gte(...args) {
    return {
      sql: args
        .map((x) => {
          if (typeof x === "function") {
            const y = x(this);
            return this.resolveOperator(y, y?.type);
          }
          return this.resolveOperator(x);
        })
        .join(" >= "),
      resolved: true,
    };
  }

  lt(...args) {
    return {
      sql: args
        .map((x) => {
          if (typeof x === "function") {
            const y = x(this);
            return this.resolveOperator(y, y?.type);
          }
          return this.resolveOperator(x);
        })
        .join(" < "),
      resolved: true,
    };
  }

  lte(...args) {
    return {
      sql: args
        .map((x) => {
          if (typeof x === "function") {
            const y = x(this);
            return this.resolveOperator(y, y?.type);
          }
          return this.resolveOperator(x);
        })
        .join(" <= "),
      resolved: true,
    };
  }

  and(...args) {
    const clause = Array.isArray(args) ? args : [args];
    const config = {
      type: "and",
      sql: clause.map((x) => this.resolveOperator(x, "and")).join(" and "),
      args: Array.isArray(args) ? args : [args],
    };
    return config;
  }

  or(...args) {
    const clause = Array.isArray(args) ? args : [args];
    const config = {
      type: "or",
      sql: clause.map((x) => this.resolveOperator(x, "or")).join(" or "),
      args: clause,
    };
    return config;
  }

  in(...args) {
    return {
      sql: this.resolveOperator(args, "in"),
      resolved: true,
    };
  }

  nin(...args) {
    return {
      sql: this.resolveOperator(args, "nin"),
      resolved: true,
    };
  }

  any(...args) {
    if (this.driver !== "postgres") {
      return this.in(...args);
    }
    return {
      sql: this.resolveOperator(args, "any"),
      resolved: true,
    };
  }

  nany(...args) {
    if (this.driver !== "postgres") {
      return this.nin(...args);
    }
    return {
      sql: this.resolveOperator(args, "nany"),
      resolved: true,
    };
  }

  all(...args) {
    if (this.driver !== "postgres") {
      throw new Error(`Driver ${this.driver} doesn't support operation [all]`);
    }

    return {
      sql: this.resolveOperator(args, "all"),
      resolved: true,
    };
  }

  nall(...args) {
    if (this.driver !== "postgres") {
      throw new Error(`Driver ${this.driver} doesn't support operation [nall]`);
    }

    return {
      sql: this.resolveOperator(args, "nall"),
      resolved: true,
    };
  }

  leftJoin({
    table,
    from,
    to,
    to_alias = "",
    from_alias = "",
    operator = "=",
  }) {
    return this.makeJoin({
      type: "left join",
      table,
      from,
      to,
      to_alias,
      from_alias,
      operator,
    });
  }

  leftOuterJoin({
    table,
    from,
    to,
    to_alias = "",
    from_alias = "",
    operator = "=",
  }) {
    return this.makeJoin({
      type: "left outer join",
      table,
      from,
      to,
      to_alias,
      from_alias,
      operator,
    });
  }

  innerJoin({
    table,
    from,
    to,
    to_alias = "",
    from_alias = "",
    operator = "=",
  }) {
    return this.makeJoin({
      type: "inner join",
      table,
      from,
      to,
      to_alias,
      from_alias,
      operator,
    });
  }

  fullOuter({
    table,
    from,
    to,
    to_alias = "",
    from_alias = "",
    operator = "=",
  }) {
    return this.makeJoin({
      type: "full outer join",
      table,
      from,
      to,
      to_alias,
      from_alias,
      operator,
    });
  }

  innerJoin({
    table,
    from,
    to,
    to_alias = "",
    from_alias = "",
    operator = "=",
  }) {
    return this.makeJoin({
      type: "right join",
      table,
      from,
      to,
      to_alias,
      from_alias,
      operator,
    });
  }

  rightOuterJoin({
    table,
    from,
    to,
    to_alias = "",
    from_alias = "",
    operator = "=",
  }) {
    return this.makeJoin({
      type: "right outer join",
      table,
      from,
      to,
      to_alias,
      from_alias,
      operator,
    });
  }

  makeJoin({
    type,
    table,
    from,
    to,
    to_alias = "",
    from_alias = "",
    operator = "=",
  }) {
    this.queryConfig.push({
      sql: [
        type,
        `${this.schemaStr}${table}${to_alias ? ` as ${to_alias}` : ""}`,
        "on",
        this.resolveColumnName(
          from,
          from_alias ? `${from_alias}.` : from_alias
        ),
        operator,
        this.resolveColumnName(to, to_alias ? `${to_alias}.` : to_alias),
      ].join(" "),
    });

    return this;
  }

  resolveOperator(input, funcName) {
    if (input.resolved) {
      return input.sql;
    }
    if (!!this.bindingOperatorToSQL[funcName]) {
      const sql = (input.args || [])
        .map((x) => {
          if (typeof x === "function") {
            const y = x(this);
            return this.resolveOperator(y, y?.type);
          }

          return this.resolveOperator(x, x?.type);
        })
        .join(` ${funcName} `);
      return `(${sql})`;
    }

    if (!!this.inArrayOperator[funcName]) {
      const [column, ...fArgs] = input;
      const sql = [
        this.resolveOperator(column),
        this.inArrayOperator[funcName],
        "(",
        fArgs
          .map((x) => {
            if (typeof x === "function") {
              const y = x(this);
              return this.resolveOperator(y, y?.type);
            }
            return this.resolveOperator(x);
          })
          .join(","),
        ")",
      ].join(" ");
      return sql;
    }

    if (input?.$$$isColumn) {
      return input.sql;
    } else {
      this.qArgs.push(input);

      return `${this.getPlaceholder()}`;
    }
  }

  isBindingOperator(func) {
    return ["and", "or"].indexOf(func.name) !== -1;
  }

  update(tableName, args) {
    const config = {
      type: "update",
      parts: ["update", `${this.schemaStr}${tableName}`],
      sql: `update ${this.schemaStr}${tableName}`,
    };

    this.queryConfig.push(config);
    return Object.keys(args || {})?.length ? this.set(args) : this;
  }

  set(args) {
    const config = {
      type: "set",
      parts: ["set"],
      sql: [
        "set",
        Object.entries(args || {})
          .map(([key, value]) => {
            let column = key;
            if (this.driver === "mysql") {
              column = "??";
              this.qArgs.push(key);
            }
            const val = typeof value === "function" ? value(this) : value;
            return `${column} = ${this.resolveOperator(val)}`;
          })
          .join(","),
      ].join(" "),
    };

    this.queryConfig.push(config);
    return this;
  }

  insert(tableName, args) {
    const [columns, values] = Object.entries(args).reduce(
      (acc, [key, value]) => {
        let column = key;
        if (this.driver === "mysql") {
          this.qArgs.push(key);
          column = "??";
        }

        const val = typeof value === "function" ? value(this) : value;
        acc[0].push(column);
        acc[1].push(this.resolveOperator(val));

        return acc;
      },
      [[], []]
    );
    this.queryConfig.push({
      type: "insert",
      parts: ["insert into", `${this.schemaStr}${tableName}`],
      sql: [
        `insert into ${this.schemaStr}${tableName}`,
        "(",
        columns.join(","),
        ")",
        "values",
        "(",
        values.join(","),
        ")",
      ].join(" "),
    });

    return this;
  }

  delete(tableName) {
    this.queryConfig.push({
      sql: `delete from ${this.schemaStr}${tableName}`,
    });

    return this;
  }

  resolveColumnName(x, alias) {
    if (typeof x === "string") {
      return `${alias || ""}${x}`;
    }

    if (x?.$$$isColumn || x?.type === "raw") {
      return x.sql;
    }

    if (x?.as) {
      return `${alias || ""}${x.name} as ${x.as}`;
    }

    return `${alias || ""}${x.name}`;
  }

  raw(...input) {
    const [_sql, args] = input;
    let formattedSQL = _sql;
    let formattedArgs = Array.isArray(args) ? args : !args ? [] : [args];
    const occurences = _sql.split("$$").length - 1;
    for (let i = 0; i < occurences; i++) {
      formattedSQL = formattedSQL.replace("$$", this.getPlaceholder());
    }
    this.qArgs.push(...formattedArgs.slice(0, occurences));
    return {
      sql: formattedSQL,
      args: formattedArgs,
      resolved: true,
      type: "raw",
    };
  }

  get get() {
    return [this.queryConfig.map((x) => x.sql).join(" "), this.qArgs];
  }

  getPlaceholder() {
    return this.driverToPlaceholderMap[this.driver]();
  }
}

class Driver {
  driver = "";
  db = null;

  constructor(
    { schema = "public", driver = "postgres" } = {
      schema: "public",
      driver: "postgres",
    }
  ) {
    if (["postgres", "mysql"].indexOf(driver) === -1) {
      throw new Error("please use postgres or mysql as the driver");
    }
    this.schema = schema;
    this.driver = driver;
  }

  setSchema(schema) {
    this.schema = schema;
  }

  setDriver(driver) {
    this.driver = driver;
  }

  query(connection = null) {
    let instance = new QueryBuilder(this.schema, this.driver);
    const exec = () => {
      try {
        console.log(instance.get);
        instance = this.query();
        return;
      } catch (error) {
        instance = this.query();
      }
    };

    instance.exec = exec;
    return instance;
  }

  withTransaction(callback) {
    let instance = new QueryBuilder(this.schema, this.driver);
    const exec = async () => {
      try {
        await db.query("begin");
        console.log(instance.get);
        instance = this.withTransaction();
        console.log(instance.get);
        await this.db.query("commit");
        return;
      } catch (error) {
        await this.db.query("roolback");
        instance = this.withTransaction();
      }
    };

    instance.exec = exec;

    return;
  }
}

// const driver = new Driver({ driver: "postgres" });
