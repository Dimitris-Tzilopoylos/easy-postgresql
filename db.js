const Column = require("./column");
const {
  WHERE_CLAUSE_OPERATORS,
  QUERY_BINDER_KEYS,
  REQUIRE_CAST_TO_NULL,
  REQUIRE_WILDCARD_TRANSFORMATION,
  IS_POSTGRES,
  SupportedAggregations,
  START_TRANSACTION,
  COMMIT,
  ROLLBACK,
  SELF_UPDATE_OPERATORS,
  EVENTS,
  REQUIRE_ARRAY_TRANSFORMATION,
  IS_POSTGIS_OPERATOR,
  POSTGIS_DISTANCE_COMPARISON_OPERATORS,
} = require("./constants");

const { Pool, types, Client } = require("pg");
const Scheduler = require("./scheduler");
const RawSQL = require("./raw");
const SQL = require("./sql");
const pg = require("pg");
types.setTypeParser(types.builtins.INT8, (x) => {
  return x && DB.isString(x) && x.length > 16 ? x : parseInt(x);
});

class DB {
  static models = {};
  static modelFactory = {};
  static database = "public";
  static enableLog = false;
  static replicas = [];
  static scheduler = Scheduler;
  static allowedOrderDirectionsKeys = {
    ASC: "ASC",
    DESC: "DESC",
    asc: "ASC",
    desc: "DESC",
    ...(IS_POSTGRES && {
      asc_nulls_first: "ASC NULLS FIRST",
      asc_nulls_last: "ASC NULLS LAST",
      desc_nulls_first: "DESC NULLS FIRST",
      desc_nulls_last: "DESC NULLS LAST",
    }),
  };
  static connectionConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // max: 50,
    // min: 0,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0,
    statement_timeout: 20000,
  };

  static EventNameSpaces = EVENTS;
  static postgis = false;

  static pool = new Pool(DB.connectionConfig);

  static client = new Client(DB.connectionConfig);

  static clientConnected = false;
  static replicationIndex = 0;
  static brokerEvents = {};
  static notificationRegistered = false;
  static events = {
    [EVENTS.SELECT]: {},
    [EVENTS.INSERT]: {},
    [EVENTS.UPDATE]: {},
    [EVENTS.DELETE]: {},
    [EVENTS.ERROR]: {},
  };

  static asyncEvents = {
    [EVENTS.SELECT]: {},
    [EVENTS.INSERT]: {},
    [EVENTS.UPDATE]: {},
    [EVENTS.DELETE]: {},
    [EVENTS.ERROR]: {},
  };

  constructor(table, connection = null, schema = "public") {
    this.table = table;
    this.relations = {};
    this.columns = {};
    this.isAggregate = false;
    this.connection = connection;
    this.connected = !!connection;
    this.transaction = false;
    this.database = DB.database;
    this.driver = null;
    this.schema = schema;
    this.savepointCounter = 0;
    this.savepointStack = [];
  }

  static async connectClient() {
    if (!DB.clientConnected) {
      try {
        DB.clientConnected = true;
        await DB.client.connect();
      } catch (error) {
        DB.clientConnected = false;
      }
    }
  }

  static async clientDisconnect() {
    if (DB.clientConnected) {
      await DB.client.end();
      DB.clientConnected = false;
    }
  }

  static hasReplicas() {
    return DB.replicas?.length > 0;
  }

  static roundRobinReplicaPoolRetrieval() {
    if (!DB.replicas.length) {
      throw new Error("0 replicas are present");
    }
    const pool = DB.replicas[DB.replicationIndex];
    DB.replicationIndex = (DB.replicationIndex + 1) % DB.replicas.length;
    return pool;
  }

  async connect(primary = true) {
    if (this.connected) {
      return;
    }
    if (primary) {
      this.connection = await DB.pool.connect();
      this.connected = true;
    } else {
      this.connection = await DB.roundRobinReplicaPoolRetrieval().connect();
      this.connected = true;
    }
  }

  disconnect() {
    if (!this.connected) {
      return;
    }
    if (this.transaction) {
      this.rollback()
        .then((x) => {
          this.connection.release();
          this.connected = false;
          this.transaction = false;
        })
        .catch((err) => {
          this.connection.release();
          this.connected = false;
          this.transaction = false;
        });
    } else {
      this.connection.release();
      this.connected = false;
      this.transaction = false;
    }
  }

  async startTransaction() {
    await this.connection.query(START_TRANSACTION);
    this.transaction = true;
  }

  async commit() {
    if (!this.transaction) {
      return;
    }
    await this.connection.query(COMMIT);
    this.transaction = false;
  }

  async rollback() {
    if (!this.transaction) {
      return;
    }
    await this.connection.query(ROLLBACK);
    this.transaction = false;
  }

  async createSavepoint() {
    this.savepointCounter++;
    const spName = `sp_${this.savepointCounter}`;
    await this.connection.query(`SAVEPOINT ${spName};`);
    this.savepointStack.push(spName);
    return spName;
  }

  async releaseSavepoint() {
    const spName = this.savepointStack.pop();
    if (spName) {
      await this.connection.query(`RELEASE SAVEPOINT ${spName};`);
    }
  }

  async rollbackToSavepoint() {
    const spName = this.savepointStack.pop();
    if (spName) {
      await this.connection.query(`ROLLBACK TO SAVEPOINT ${spName};`);
    }
  }

  async withSavepoint(cb) {
    await this.createSavepoint();
    try {
      const result = await cb(this.connection);
      await this.releaseSavepoint();
      return result;
    } catch (err) {
      await this.rollbackToSavepoint();
      throw err;
    }
  }

  async withTransaction(cb) {
    try {
      await this.connect();
      await this.startTransaction();
      const result = await cb(this.connection);
      await this.commit();
      this.disconnect();
      return result;
    } catch (error) {
      await this.rollback();
      this.disconnect();
      return error;
    }
  }

  async selectQueryExec(sql, args = []) {
    const {
      rows: [result],
    } = await this.raw(sql, args, !!this.connection || !DB.hasReplicas());
    return result;
  }

  async insertQueryExec(sql, args) {
    const { rows } = this.connection
      ? await this.connection.query(sql, args)
      : await DB.pool.query(sql, args);
    return rows;
  }

  async updateQueryExec(sql, args) {
    const { rows } = this.connection
      ? await this.connection.query(sql, args)
      : await DB.pool.query(sql, args);
    return rows;
  }

  async deleteQueryExec(sql, args) {
    const { rows } = this.connection
      ? await this.connection.query(sql, args)
      : await DB.pool.query(sql, args);
    return rows;
  }

  async raw(sql, args = [], primary = true) {
    if (this.connection) {
      return await this.connection.query(sql, args);
    }

    if (primary || !DB.hasReplicas()) {
      return await DB.pool.query(sql, args);
    } else {
      return await DB.roundRobinReplicaPoolRetrieval().query(sql, args);
    }
  }

  async findOne({
    where = {},
    include = {},
    aggregate = null,
    select = [],
    orderBy,
    groupBy,
    distinct,
    extras,
  } = {}) {
    try {
      const [result] = await this.find({
        where,
        include,
        aggregate,
        orderBy,
        groupBy,
        distinct,
        select,
        limit: 1,
        extras,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async find({
    where = {},
    include = {},
    aggregate = null,
    orderBy,
    groupBy,
    distinct,
    select,
    limit,
    offset,
    extras,
  } = {}) {
    try {
      let depth = 0;
      let index = 1;
      const alias = this.makeDepthAlias(this.table, depth);
      const args = [];
      const modelColumnsStr = this.getModelColumnsCommaSeperatedString(
        alias,
        select,
        extras
      );
      const selectColumnsStr = [modelColumnsStr]
        .concat(
          Object.keys(include).map(
            (alias, idx) => `${this.makeDepthAlias(alias, 1 + idx)}.${alias}`
          )
        )
        .join(",");

      let sql = `SELECT coalesce(json_agg(${alias}),'[]') as ${this.table} 
        FROM (
          SELECT row_to_json((
            SELECT ${alias}
            FROM ( SELECT ${selectColumnsStr}) ${alias} )) ${alias}
            FROM (
              SELECT ${this.makeDistinctOn(
                distinct,
                alias
              )} ${modelColumnsStr} FROM ${this.schema}.${this.table} ${alias}`;
      const self = this;

      function makeQuery(model, relations, depth, prevAlias) {
        if (!relations || typeof relations === "boolean") {
          return "";
        }
        let sql = ``;
        const _iter = Object.entries(relations);

        for (let i = 0; i < _iter.length; i++) {
          const [_alias, config] = _iter[i];
          const alias = DB.getRelationNameWithoutAggregate(_alias);
          const isAggregate = DB.getIsAggregate(_alias);
          const relation = model.relations[alias];
          if (!relation) {
            throw new Error("no such relation");
          }
          const currentModel = DB.getRelatedModel(relation);
          if (!currentModel) {
            throw new Error(`no such model for table ${relation.to_table}`);
          }
          const depthAlias = isAggregate
            ? self.makeDepthAlias(relation.alias, depth + i) + "_aggregate"
            : self.makeDepthAlias(relation.alias, depth + i);
          const coalesceFallback = relation.type === "object" ? "null" : "[]";
          const coalesceAppendex = relation.type === "object" ? "->0" : "";
          const modelColumnsStr =
            currentModel.getModelColumnsCommaSeperatedString(
              depthAlias,
              config?.select,
              config?.extras
            );
          const { distinct, groupBy, orderBy, where, include, limit, offset } =
            DB.isObject(config) ? config : {};

          const selectColumnsStr = [modelColumnsStr]
            .concat(
              Object.keys(include || {}).map(
                (alias, idx) =>
                  `${self.makeDepthAlias(alias, depth + 1 + idx)}.${alias}`
              )
            )
            .join(",");
          if (isAggregate) {
            const [agg] = currentModel.aggregateInternal({
              ...config,
              alias: depthAlias,
              relationAlias: relation.alias,
            });
            sql += `
              LEFT JOIN LATERAL  (${agg} 
            `;
          } else {
            sql += ` 
          LEFT OUTER JOIN LATERAL ( SELECT coalesce(json_agg(${depthAlias})${coalesceAppendex},'${coalesceFallback}') as ${
              relation.alias
            } 
          FROM (
            SELECT row_to_json((
              SELECT ${depthAlias}
              FROM ( SELECT ${selectColumnsStr}) ${depthAlias} )) ${depthAlias}
              FROM (
                SELECT ${currentModel.makeDistinctOn(
                  distinct,
                  depthAlias
                )} ${modelColumnsStr} FROM ${currentModel.schema}.${
              currentModel.table
            } ${depthAlias} `;
          }

          const appendSql = makeQuery(
            currentModel,
            include,
            depth + 1,
            depthAlias
          );

          const [whereClauseStr, qArgs, idx] = currentModel.makeWhereClause(
            currentModel,
            where,
            index,
            depthAlias,
            false,
            false
          );
          args.push(...qArgs);
          index = idx;
          const groupByStr = currentModel.makeGroupBy(groupBy, depthAlias);
          const [orderByStr, orderByArgs, orderByIndx] =
            currentModel.makeOrderBy(orderBy, index, depthAlias);
          args.push(...orderByArgs);
          index = orderByIndx;
          const [limitStr, limitArgs, idxLimit] = currentModel.makeLimit(
            limit,
            index
          );
          index = idxLimit;
          args.push(...limitArgs);
          const [offsetStr, offsetArgs, idxOffset] = currentModel.makeOffset(
            offset,
            index
          );
          args.push(...offsetArgs);
          index = idxOffset;

          if (!isAggregate) {
            sql += `
            WHERE ${prevAlias}.${relation.from_column} = ${depthAlias}.${relation.to_column}
            ${whereClauseStr}
            ${groupByStr}
            ${orderByStr}
            ${limitStr}
            ${offsetStr} ) ${depthAlias}  ${appendSql} ) ${depthAlias} ) AS ${depthAlias} ON true
            `;
          } else {
            sql += ` WHERE ${prevAlias}.${relation.from_column} = ${depthAlias}.${relation.to_column}
            ${whereClauseStr}
            ${groupByStr} )   AS ${depthAlias} ON true`;
          }
        }
        return sql;
      }

      const [whereClauseStr, whereArgs, idx] = this.makeWhereClause(
        this,
        where,
        index,
        alias,
        true,
        true
      );
      index = idx;
      args.push(...whereArgs);
      const groupByStr = this.makeGroupBy(groupBy, alias);
      const [orderByStr, orderByArgs, orderByIndx] = this.makeOrderBy(
        orderBy,
        index,
        alias
      );
      args.push(...orderByArgs);
      index = orderByIndx;
      const [limitStr, limitArgs, idxLimit] = this.makeLimit(limit, index);
      index = idxLimit;
      args.push(...limitArgs);
      const [offsetStr, offsetArgs, idxOffset] = this.makeOffset(offset, index);
      args.push(...offsetArgs);
      index = idxOffset;
      sql += `
      ${whereClauseStr}
      ${groupByStr}
      ${orderByStr}
      ${limitStr}
      ${offsetStr} ) ${alias}
      `;
      sql += makeQuery(this, include, depth + 1, alias);
      sql += ` ) ${alias}`;
      if (DB.enableLog) {
        console.log(sql, args);
      }
      const result = (await this.selectQueryExec(sql, args))?.[this.table];
      if (DB.eventExists(this.table, DB.EventNameSpaces.SELECT)) {
        DB.executeEvent(this.table, DB.EventNameSpaces.SELECT, result, this);
      }
      if (DB.asyncEventExists(this.table, DB.EventNameSpaces.SELECT)) {
        await DB.executeAsyncEvent(
          this.table,
          DB.EventNameSpaces.SELECT,
          result,
          this
        );
      }
      return result;
    } catch (error) {
      if (DB.eventExists(this.table, DB.EventNameSpaces.ERROR)) {
        DB.executeEvent(this.table, DB.EventNameSpaces.ERROR, error, this);
      }
      if (DB.asyncEventExists(this.table, DB.EventNameSpaces.ERROR)) {
        await DB.executeAsyncEvent(
          this.table,
          DB.EventNameSpaces.ERROR,
          error,
          this
        );
      }
      throw error;
    }
  }

  async insert(args) {
    if (!DB.isObject(args)) {
      return null;
    }
    try {
      const { onConflict, ...rest } = args;
      const [modelPayload, relationalPayload] =
        this.splitRelationalAndModelColumnsInput(rest);

      const [query, qArgs] = this.buildInsertQuery(modelPayload, onConflict);
      if (DB.enableLog) {
        console.log(query, qArgs);
      }
      const [result] = await this.insertQueryExec(query, qArgs);
      const self = this;
      async function insertChildren(model, prevResult, relationalPayload) {
        const _iter = Object.keys(relationalPayload || {});
        const aggResult = {};
        if (!_iter.length) {
          return aggResult;
        }
        for (let i = 0; i < _iter.length; i++) {
          const relationAlias = _iter[i];
          const insertInput = relationalPayload[relationAlias];
          const relation = model.relations?.[relationAlias];
          if (!relation) {
            throw new Error("no such relation");
          }
          const insertionModel = DB.getRelatedModel(relation);
          if (!insertionModel) {
            throw new Error("no such model");
          }
          if (relation.type === "object" && Array.isArray(insertInput)) {
            throw new Error(
              "relation type object cannot accept an array as input"
            );
          }

          if (relation.type === "array" && !Array.isArray(insertInput)) {
            throw new Error("relation type array can only accept array inputs");
          }

          const dependedColumnValue = prevResult[relation.from_column];

          const valuesIter =
            relation.type === "object" ? [insertInput] : insertInput;
          const appendResult = [];
          for (let value of valuesIter) {
            value[relation.to_column] = dependedColumnValue;
            const { onConflict, ...rest } = value;
            const [modelPayload, relationalPayload] =
              insertionModel.splitRelationalAndModelColumnsInput(rest);
            const [query, args] = insertionModel.buildInsertQuery(
              modelPayload,
              onConflict
            );
            const [result] = await self.insertQueryExec(query, args);
            const childrenResult = await insertChildren(
              insertionModel,
              result,
              relationalPayload
            );
            if (Object.keys(childrenResult)?.length) {
              Object.assign(result, childrenResult);
            }
            appendResult.push(result);
          }

          if (relation.type === "object") {
            aggResult[relationAlias] = appendResult[0];
          } else {
            aggResult[relationAlias] = appendResult;
          }
        }

        return aggResult;
      }
      const childrenResult = await insertChildren(
        this,
        result,
        relationalPayload
      );
      if (Object.keys(childrenResult)?.length) {
        Object.assign(result, childrenResult);
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createTX(args) {
    try {
      await this.connect();
      const result = await this.withTransaction(async (tx) => {
        return await this.insert(args);
      });
      this.disconnect();
      if (DB.eventExists(this.table, DB.EventNameSpaces.INSERT)) {
        DB.executeEvent(this.table, DB.EventNameSpaces.INSERT, result, this);
      }
      if (DB.asyncEventExists(this.table, DB.EventNameSpaces.INSERT)) {
        await DB.executeAsyncEvent(
          this.table,
          DB.EventNameSpaces.INSERT,
          result,
          this
        );
      }
      return result;
    } catch (error) {
      this.disconnect();
      if (DB.eventExists(this.table, DB.EventNameSpaces.ERROR)) {
        DB.executeEvent(this.table, DB.EventNameSpaces.ERROR, error, this);
      }
      if (DB.eventExists(this.table, DB.EventNameSpaces.ERROR)) {
        await DB.executeAsyncEvent(
          this.table,
          DB.EventNameSpaces.ERROR,
          error,
          this
        );
      }
      throw error;
    }
  }

  async createManyTX(args) {
    try {
      if (!Array.isArray(args)) {
        throw new Error("provided input is not an array");
      }
      await this.connect();
      const result = await this.withTransaction(async (tx) => {
        const results = [];
        for (const input of args) {
          const res = await this.insert(input);
          if (res instanceof Error) {
            throw res;
          }
          results.push(res);
        }
        return results;
      });
      this.disconnect();
      if (DB.eventExists(this.table, DB.EventNameSpaces.INSERT)) {
        DB.executeEvent(this.table, DB.EventNameSpaces.INSERT, result, this);
      }
      if (DB.asyncEventExists(this.table, DB.EventNameSpaces.INSERT)) {
        await DB.executeAsyncEvent(
          this.table,
          DB.EventNameSpaces.INSERT,
          result,
          this
        );
      }
      return result;
    } catch (error) {
      this.disconnect();
      if (DB.eventExists(this.table, DB.EventNameSpaces.ERROR)) {
        DB.executeEvent(this.table, DB.EventNameSpaces.ERROR, error, this);
      }
      if (DB.asyncEventExists(this.table, DB.EventNameSpaces.ERROR)) {
        await DB.executeAsyncEvent(
          this.table,
          DB.EventNameSpaces.ERROR,
          error,
          this
        );
      }
      throw error;
    }
  }

  async create(args) {
    try {
      const result = await this.insert(args);
      if (DB.eventExists(this.table, DB.EventNameSpaces.INSERT)) {
        DB.executeEvent(this.table, DB.EventNameSpaces.INSERT, result, this);
      }
      if (DB.asyncEventExists(this.table, DB.EventNameSpaces.INSERT)) {
        await DB.executeAsyncEvent(
          this.table,
          DB.EventNameSpaces.INSERT,
          result,
          this
        );
      }
      return result;
    } catch (error) {
      if (DB.eventExists(this.table, DB.EventNameSpaces.ERROR)) {
        DB.executeEvent(this.table, DB.EventNameSpaces.ERROR, error, this);
      }
      if (DB.asyncEventExists(this.table, DB.EventNameSpaces.ERROR)) {
        await DB.executeAsyncEvent(
          this.table,
          DB.EventNameSpaces.ERROR,
          error,
          this
        );
      }
      throw error;
    }
  }

  async createMany(args) {
    try {
      if (!Array.isArray(args)) {
        throw new Error("provided input is not an array");
      }
      const promises = args.map((input) => this.insert(input));
      const result = await Promise.all(promises);
      if (DB.eventExists(this.table, DB.EventNameSpaces.INSERT)) {
        DB.executeEvent(this.table, DB.EventNameSpaces.INSERT, result, this);
      }
      if (DB.asyncEventExists(this.table, DB.EventNameSpaces.INSERT)) {
        await DB.executeAsyncEvent(
          this.table,
          DB.EventNameSpaces.INSERT,
          result,
          this
        );
      }
      return result;
    } catch (error) {
      if (DB.eventExists(this.table, DB.EventNameSpaces.ERROR)) {
        DB.executeEvent(this.table, DB.EventNameSpaces.ERROR, error, this);
      }
      if (DB.asyncEventExists(this.table, DB.EventNameSpaces.ERROR)) {
        await DB.executeAsyncEvent(
          this.table,
          DB.EventNameSpaces.ERROR,
          error,
          this
        );
      }
      throw error;
    }
  }

  buildUpdateSetOperation(columns, index = 0, isConflict, updatedColumns) {
    return Object.entries(columns).reduce(
      (acc, [key, value]) => {
        if (SELF_UPDATE_OPERATORS[key]) {
          if (!DB.isObject(value)) {
            throw new Error(
              "self update operators should have an object value"
            );
          }

          const [selfUpdateColumns] =
            this.splitRelationalAndModelColumnsInput(value);

          acc[0].push(
            ...Object.entries(selfUpdateColumns).map(([c, val]) => {
              const sql = `${c} = ${c} ${SELF_UPDATE_OPERATORS[key]} $${
                acc[1].length + 1 + index
              }`;
              acc[1].push(val);
              return sql;
            })
          );
        } else {
          if (this.isGeospatialColumn(key)) {
            const [str, args, _] = this.getGeospatialColumnValueForStatement(
              this.columns[key],
              value,
              acc[1].length
            );
            acc[0].push(`${key} = ${str}`);
            acc[1].push(...args);
          } else {
            if (value instanceof SQL) {
              const [str, qArgs, _] = value.__getSQL({
                index: acc[1].length + 1 + index,
                column: key,
                alias: this.table,
                args: acc[1],
                binder: "",
              });
              if (str) {
                acc[0].push(` ${key} = ${str} `);
                acc[1].push(...qArgs);
              }
              return acc;
            }
            acc[0].push(`${key} = $${acc[1].length + 1 + index}`);
            acc[1].push(value);
          }
        }

        return acc;
      },
      [[], []]
    );
  }

  async update({ update, where = {} }) {
    try {
      const [modelColumns] = this.splitRelationalAndModelColumnsInput(
        update,
        Object.keys(SELF_UPDATE_OPERATORS)
      );
      const [columns, qArgs] = this.buildUpdateSetOperation(modelColumns, 0);
      const [whereStr, whereArgs] = this.makeWhereClause(
        this,
        where,
        qArgs.length + 1,
        this.table,
        true,
        true
      );
      const sql = `UPDATE ${this.schema}.${this.table} SET ${columns.join(
        ","
      )} ${whereStr} RETURNING *`;
      qArgs.push(...whereArgs);
      if (DB.enableLog) {
        console.log(sql, whereArgs);
      }
      const result = await this.updateQueryExec(sql, qArgs);
      if (DB.eventExists(this.table, DB.EventNameSpaces.UPDATE)) {
        DB.executeEvent(this.table, DB.EventNameSpaces.UPDATE, result, this);
      }
      if (DB.asyncEventExists(this.table, DB.EventNameSpaces.UPDATE)) {
        await DB.executeAsyncEvent(
          this.table,
          DB.EventNameSpaces.UPDATE,
          result,
          this
        );
      }
      return result;
    } catch (error) {
      if (DB.eventExists(this.table, DB.EventNameSpaces.ERROR)) {
        DB.executeEvent(this.table, DB.EventNameSpaces.ERROR, error, this);
      }
      if (DB.asyncEventExists(this.table, DB.EventNameSpaces.ERROR)) {
        await DB.executeAsyncEvent(
          this.table,
          DB.EventNameSpaces.ERROR,
          error,
          this
        );
      }
      throw error;
    }
  }

  async delete({ where = {} }) {
    try {
      const [whereStr, whereArgs] = this.makeWhereClause(
        this,
        where,
        1,
        this.table,
        true,
        true
      );
      const sql = `DELETE FROM ${this.schema}.${this.table} ${whereStr} RETURNING *`;
      const result = await this.deleteQueryExec(sql, whereArgs);
      if (DB.eventExists(this.table, DB.EventNameSpaces.DELETE)) {
        DB.executeEvent(this.table, DB.EventNameSpaces.DELETE, result, this);
      }
      if (DB.asyncEventExists(this.table, DB.EventNameSpaces.DELETE)) {
        await DB.executeAsyncEvent(
          this.table,
          DB.EventNameSpaces.DELETE,
          result,
          this
        );
      }
      return result;
    } catch (error) {
      if (DB.eventExists(this.table, DB.EventNameSpaces.ERROR)) {
        DB.executeEvent(this.table, DB.EventNameSpaces.ERROR, error, this);
      }
      if (DB.asyncEventExists(this.table, DB.EventNameSpaces.ERROR)) {
        await DB.executeAsyncEvent(
          this.table,
          DB.EventNameSpaces.ERROR,
          error,
          this
        );
      }
      throw error;
    }
  }

  async aggregate({
    where,
    groupBy,
    distinct,
    _count,
    _max,
    _min,
    _sum,
    _avg,
  } = {}) {
    try {
      const countAgg = this.buildCountAgg(_count, distinct, this.table);

      const aggregations = [
        { key: "_min", value: _min },
        { key: "_max", value: _max },
        { key: "_sum", value: _sum },
        { key: "_avg", value: _avg },
      ]
        .map((x) => this.buildAgg(x.value, x.key))
        .concat(countAgg)
        .filter(Boolean)
        .join(",");
      if (!aggregations.length) {
        throw new Error("no aggregations were found for this operation");
      }

      const [whereStr, whereArgs] = this.makeWhereClause(
        this,
        where,
        1,
        this.table,
        true,
        true
      );
      const groupByStr = this.makeGroupBy(groupBy, this.table);

      const sql = `SELECT json_build_object(${aggregations})  as ${this.table}_aggregate FROM ${this.schema}.${this.table}  ${whereStr} ${groupByStr}`;

      return (await this.selectQueryExec(sql, whereArgs))?.[
        `${this.table}_aggregate`
      ];
    } catch (error) {
      throw error;
    }
  }

  aggregateInternal({
    where,
    groupBy,
    distinct,
    _count,
    _max,
    _min,
    _sum,
    _avg,
    index = 1,
    alias,
    withWhere = false,
    relationAlias,
  } = {}) {
    try {
      const countAgg = this.buildCountAgg(
        _count,
        distinct,
        alias || this.table
      );

      const aggregations = [
        { key: "_min", value: _min },
        { key: "_max", value: _max },
        { key: "_sum", value: _sum },
        { key: "_avg", value: _avg },
      ]
        .map((x) => this.buildAgg(x.value, x.key))
        .concat(countAgg)
        .filter(Boolean)
        .join(",");
      if (!aggregations.length) {
        throw new Error("no aggregations were found for this operation");
      }
      if (withWhere) {
        const [whereStr, whereArgs, idx] = this.makeWhereClause(
          this,
          where,
          index,
          alias,
          true,
          true
        );
        const groupByStr = this.makeGroupBy(groupBy, this.table);
        // const distinctStr = this.makeDistinctOn(distinct, this.table);
        const sql = `SELECT json_build_object(${aggregations})  as ${relationAlias}_aggregate FROM ${this.schema}.${this.table} as ${alias}  ${whereStr} ${groupByStr}`;
        return [sql, whereArgs, idx];
      }
      const groupByStr = this.makeGroupBy(groupBy, this.table);
      const distinctStr = this.makeDistinctOn(distinct, this.table);
      const sql = `SELECT ${distinctStr} json_build_object(${aggregations})  as ${relationAlias}_aggregate FROM ${this.schema}.${this.table} as ${alias} ${groupByStr}`;
      return [sql, "", index];
    } catch (error) {
      throw error;
    }
  }

  buildCountAgg(count, distinct, table) {
    if (!count) {
      return;
    }

    if (distinct) {
      const formattedDistinct = Array.isArray(distinct)
        ? distinct.length > 1
          ? distinct[0]
          : distinct
        : distinct;
      if (!formattedDistinct || !formattedDistinct?.length) {
        return `'count',COUNT(*)`;
      }
      return `'count',COUNT(DISTINCT ${formattedDistinct})`;
    }

    return `'count',COUNT(*)`;
  }

  buildAgg(aggConfig, key) {
    if (!DB.isObject(aggConfig)) {
      return;
    }

    const [modelColumns] = this.splitRelationalAndModelColumnsInput(aggConfig);

    const columns = Object.keys(modelColumns).filter((x) => !!modelColumns[x]);

    if (!columns.length) {
      return [];
    }

    return `'${SupportedAggregations[
      key
    ].toLowerCase()}',json_build_object(${columns
      .map((column) => `'${column}',${SupportedAggregations[key]}(${column})`)
      .join(",")})`;
  }

  isGeospatialColumn(key) {
    return (
      DB.postgis &&
      (this.columns?.[key]?.type?.toLowerCase()?.includes("geometry") ||
        this.columns?.[key]?.type?.toLowerCase()?.includes("geography"))
    );
  }

  getGeoJSONFunctionByColumnType(column) {
    switch (column.type?.toLowerCase()?.trim()) {
      case "geography":
        return `ST_GeogFromGeoJSON`;
      case "geometry":
        return `ST_GeomFromGeoJSON`;
      default:
        throw new Error(`Unsupported column type ${column.type}`);
    }
  }

  getGeospatialColumnValueForStatement(column, data, currentIndex) {
    const { srid, ...rest } = data || {};

    if (!rest?.type) {
      throw new Error("No geometry type provided");
    }
    const str = `${
      !!srid ? `ST_SetSRID(` : ""
    }${this.getGeoJSONFunctionByColumnType(column)}($${currentIndex + 1})${
      srid ? `, $${currentIndex + 2})` : ""
    }`;

    return [
      str,
      srid ? [rest, srid] : [rest],
      srid ? currentIndex + 1 : currentIndex,
    ];
  }

  buildInsertQuery(args, onConflict) {
    if (!DB.isObject(args)) {
      throw new Error();
    }
    let index = 0;

    const [columns, placeholders, qArgs] = Object.entries(args).reduce(
      (acc, [key, value]) => {
        acc[0].push(key);
        if (this.isGeospatialColumn(key)) {
          const [str, args, currentIndex] =
            this.getGeospatialColumnValueForStatement(
              this.columns[key],
              value,
              index
            );
          index = currentIndex + 1;
          acc[1].push(str);
          acc[2].push(...args);
        } else {
          acc[1].push(`$${index + 1}`);
          index++;
          acc[2].push(value);
        }

        return acc;
      },
      [[], [], []]
    );

    const { update, ignore, constraint, where } = onConflict || {};
    let conflictSql = "";
    if (
      !!constraint &&
      (typeof constraint === "string" ||
        (Array.isArray(constraint) && constraint.length > 0))
    ) {
      conflictSql = ` ON CONFLICT (${
        Array.isArray(constraint) ? constraint.join(",") : constraint
      }) `;
      if (!!ignore) {
        conflictSql += ` DO NOTHING `;
      } else if (update?.length) {
        const columns = update
          .reduce((acc, c) => {
            acc.push(`${c} = EXCLUDED.${c}`);
            return acc;
          }, [])
          .join(",");
        const [whereStr, whereArgs] = this.makeWhereClause(
          this,
          where,
          qArgs.length + 1,
          this.table,
          true,
          true
        );

        conflictSql += ` DO UPDATE SET ${columns} ${whereStr}`;
        qArgs.push(...whereArgs);
      }
    }
    // const conflictingSql = !!ignore ? ' ON CONFLICT DO NOTHING ' : !!update && Array.isArray(update) && update.length > 0 ?   : ''
    return [
      `INSERT INTO ${this.schema}.${this.table} (${columns.join(
        ","
      )}) VALUES(${placeholders.join(",")}) ${conflictSql} RETURNING *`,
      qArgs,
    ];
  }

  makeDistinctOn(distinct, alias) {
    if (!Array.isArray(distinct) || !distinct?.length) {
      return "";
    }

    const strFields = distinct
      .filter((col) => !!this.columns[col])
      .map((col) => `${alias ? `${alias}.` : ""}${col}`)
      .join(",");

    if (!strFields.length) {
      return "";
    }

    return `DISTINCT ON (${strFields})`;
  }

  makeWhereClause(
    model,
    where,
    index,
    alias,
    isFirstEntry = true,
    startWithWhere = true,
    binder = "AND",
    depth = 0
  ) {
    if (!model || !where || !DB.isObject(where)) {
      return ["", [], index];
    }

    const args = [];

    let _iter = Object.entries(where);
    if (!_iter?.length) {
      return ["", [], index];
    }
    let sql = startWithWhere && _iter.length ? "WHERE" : "";
    function getFirstEntry(isFirstEntry, operator) {
      if (isFirstEntry) {
        return "";
      }

      return operator || WHERE_CLAUSE_OPERATORS._and;
    }

    for (let y = 0; y < _iter.length; y++) {
      const [key, config] = _iter[y];
      if (QUERY_BINDER_KEYS[key]) {
        if (!Array.isArray(config)) {
          throw new Error(
            "No Array provided for query logical binder operation"
          );
        }
        if (!config.length) {
          continue;
        }
        sql += ` ${getFirstEntry(isFirstEntry, binder)} ( `;

        for (let i = 0; i < config.length; i++) {
          const entry = config[i];
          const [str, qArgs, idx] = this.makeWhereClause(
            model,
            entry,
            index,
            alias,
            i === 0,
            false,
            WHERE_CLAUSE_OPERATORS[key]
          );
          sql += `${str}`;
          args.push(...qArgs);
          index = idx;
        }
        sql += `)`;
      } else if (WHERE_CLAUSE_OPERATORS[key]) {
        if (REQUIRE_CAST_TO_NULL[key]) {
          sql += ` ${WHERE_CLAUSE_OPERATORS[key]} NULL`;
        } else if (REQUIRE_WILDCARD_TRANSFORMATION[key]) {
          sql += ` ${WHERE_CLAUSE_OPERATORS[key]} $${index}`;
          args.push(`%${config}%`);
          index++;
        } else if (REQUIRE_ARRAY_TRANSFORMATION[key]) {
          sql += ` ${WHERE_CLAUSE_OPERATORS[key]} ($${index})`;
          args.push(config);
          index++;
        } else {
          if (config instanceof Column) {
            sql += ` ${WHERE_CLAUSE_OPERATORS[key]} ${
              config.alias ? "" : `${alias}.`
            }${config.column}`;
          } else if (config instanceof RawSQL) {
            const [str, qArgs, idx] = config.__getFormattedSQL(index, alias);
            sql += ` ${WHERE_CLAUSE_OPERATORS[key]} ${str}`;
            index = idx;
            args.push(...qArgs);
          } else if (config instanceof SQL) {
            const [str, qArgs, idx] = config.__getSQL({
              alias,
              index,
              args,
              column: key,
              binder,
            });
            sql += ` ${str} `;
            args.push(...qArgs);
            index = idx;
          } else {
            sql += ` ${WHERE_CLAUSE_OPERATORS[key]} $${index}`;
            args.push(config);
            index++;
          }
        }
      } else if (model.columns[key]) {
        const [isArrayComparison, sqlSTR, arrayKey] =
          model.isArrayComparison(config);
        if (isArrayComparison) {
          sql += ` ${getFirstEntry(
            isFirstEntry,
            binder
          )} $${index} ${sqlSTR}(${alias}.${model.columns[key].column}) `;
          index++;
          args.push(config[arrayKey]);
          isFirstEntry = false;
          continue;
        }
        const [isGIS, _, configKey] = model.isGISComparison(config);

        if (isGIS) {
          const [gisSQL, gisArgs, idx] = model.mapGISOperation(
            configKey,
            model.columns[key],
            config[configKey],
            index,
            alias
          );

          sql += ` ${getFirstEntry(isFirstEntry, binder)} ${gisSQL} `;
          index = idx + 1;
          args.push(...gisArgs);
          isFirstEntry = false;
          continue;
        } else if (config instanceof RawSQL) {
          const [str, qArgs, idx] = config.__getFormattedSQL(index, alias);
          sql += ` ${WHERE_CLAUSE_OPERATORS[key]} ${str}`;
          index = idx;
          args.push(...qArgs);
          isFirstEntry = false;
          continue;
        } else if (config instanceof SQL) {
          const [str, qArgs, idx] = config.__getSQL({
            alias,
            index,
            args,
            column: key,
            binder,
          });
          sql += ` ${getFirstEntry(isFirstEntry, binder)} ${str} `;
          args.push(...qArgs);
          index = idx;
          isFirstEntry = false;
          continue;
        }
        sql += ` ${getFirstEntry(isFirstEntry, binder)} ${alias}.${
          model.columns[key].column
        }`;
        const [qStr, qArgs, idx] = this.makeWhereClause(
          model,
          config,
          index,
          alias,
          isFirstEntry,
          false,
          binder
        );

        sql += qStr;
        args.push(...qArgs);
        index = idx;
      } else if (key === "_not") {
        const [relationKey] = Object.keys(config);
        const relation = model.relations[relationKey];
        const currentModel = DB.getRelatedModel(relation);
        const newAlias = this.makeDepthAlias(relation.alias, depth);
        sql += ` ${getFirstEntry(isFirstEntry, binder)}  NOT EXISTS (SELECT ${
          relation.to_column
        } FROM ${currentModel?.schema || DB.database}.${
          currentModel.table
        } ${newAlias} WHERE ${alias}.${relation.from_column} = ${newAlias}.${
          relation.to_column
        }`;
        const [qString, qArgs, idx] = currentModel.makeWhereClause(
          currentModel,
          where[key][relationKey],
          index,
          newAlias,
          false,
          false,
          binder,
          depth + 1
        );
        sql += ` ${qString} )`;
        args.push(...qArgs);
        index = idx;
      } else if (model.relations[key]) {
        const relation = model.relations[key];
        const currentModel = DB.getRelatedModel(relation);
        const newAlias = this.makeDepthAlias(relation.alias, depth);
        sql += ` ${getFirstEntry(isFirstEntry, binder)} ${alias}.${
          relation.from_column
        } IN (SELECT ${relation.to_column} FROM ${
          relation?.schema || DB.database
        }.${currentModel.table} ${newAlias} WHERE ${alias}.${
          relation.from_column
        } = ${newAlias}.${relation.to_column}`;
        const [qString, qArgs, idx] = currentModel.makeWhereClause(
          currentModel,
          where[key],
          index,
          newAlias,
          false,
          false,
          binder,
          depth + 1
        );
        sql += ` ${qString} )`;
        args.push(...qArgs);
        index = idx;
      } else {
        throw new Error("UNKNOWN OPERATION");
      }
      isFirstEntry = false;
    }

    return [sql, args, index];
  }

  withSRIDFilter(column, value, index, alias) {
    if (typeof value?.srid === "number" || typeof value?.srid === "string") {
      const { srid, ...rest } = value;
      return [
        `ST_SetSRID(${alias}.${
          column?.column || column
        },$${index}), ST_SetSRID(${this.getGeoJSONFunctionByColumnType(
          column
        )}($${index + 1}), $${index + 2})`,
        [srid, rest, srid],
        index + 2,
      ];
    } else {
      return [
        `${alias}.${
          column?.column || column
        }, ST_SetSRID(${this.getGeoJSONFunctionByColumnType(
          column
        )}($${index}),ST_SRID(${alias}.${column?.column || column}))`,
        [value],
        index,
      ];
    }
  }

  mapGISDistanceOperation(key, column, config, index, alias) {
    const { distance, ...rest } = config;

    switch (key) {
      case "_st_3d_distance":
      case "_st_distance": {
        const [[distanceOperatorKey, distanceValue]] = Object.entries(
          distance || {}
        );
        if (!POSTGIS_DISTANCE_COMPARISON_OPERATORS[distanceOperatorKey]) {
          throw new Error(
            `Unsupported operator ${distanceOperatorKey} for gis comparison`
          );
        }
        const [str, args, idx] = this.withSRIDFilter(
          column,
          rest,
          index,
          alias
        );
        const operator = WHERE_CLAUSE_OPERATORS[distanceOperatorKey];
        const sql = ` ${IS_POSTGIS_OPERATOR[key]}(${str}) ${operator} $${
          idx + 1
        }`;
        return [sql, args.concat(distanceValue), idx + 1];
      }
      case "_st_d_within":
      case "_st_d_nwithin": {
        const [str, args, idx] = this.withSRIDFilter(
          column,
          rest,
          index,
          alias
        );
        const sql = ` ${IS_POSTGIS_OPERATOR[key]}(${str},$${idx + 1})`;
        return [sql, args.concat(distance), idx + 1];
      }
      default:
        return ["", [], index];
    }
  }

  mapGISOperation(key, column, config, index, alias) {
    switch (key) {
      case "_st_intersects":
      case "_st_nintersects":
      case "_st_contains":
      case "_st_ncontains":
      case "_st_within":
      case "_st_nwithin":
      case "_st_covers":
      case "_st_ncovers":
      case "_st_overlaps":
      case "_st_noverlaps":
      case "_st_touches":
      case "_st_ntouches":
      case "_st_crosses":
      case "_st_ncrosses":
      case "_st_disjoint":
      case "_st_ndisjoint":
      case "_st_equals":
      case "_st_nequals": {
        const [str, args, idx] = this.withSRIDFilter(
          column,
          config,
          index,
          alias
        );
        const sql = ` ${IS_POSTGIS_OPERATOR[key]}(${str})`;
        return [sql, args, idx];
      }
      case "_st_3d_distance":
      case "_st_d_within":
      case "_st_distance":
      case "_st_d_nwithin":
        return this.mapGISDistanceOperation(key, column, config, index, alias);
      default:
        throw new Error(
          `operator ${key} is not implemented for postgis operations`
        );
    }
  }

  isGISComparison(config) {
    if (!DB.postgis) {
      return [false, undefined, undefined];
    }
    const key = Object.keys(config).find((k) => IS_POSTGIS_OPERATOR[k]);
    return [!!key, IS_POSTGIS_OPERATOR[key], key];
  }

  isArrayComparison(config) {
    const ok = !!config?._in_array || !!config?._nin_array;
    if (!ok) {
      return [ok, undefined];
    }

    const sqlSTR = !!config?._in_array
      ? WHERE_CLAUSE_OPERATORS._in_array
      : WHERE_CLAUSE_OPERATORS._nin_array;

    return [ok, sqlSTR, !!config?._in_array ? "_in_array" : "_nin_array"];
  }

  makeGroupBy(groupBy, alias) {
    if (!Array.isArray(groupBy) || !groupBy?.length) {
      return "";
    }
    const strFields = groupBy
      .reduce((acc, col) => {
        if (!!this.columns[col]) {
          acc.push(`${alias ? `${alias}.` : ""}${col}`);
        } else if (col instanceof SQL) {
          const [sql] = col.__getSQL({
            alias: alias || this.table,
          });
          acc.push(sql);
        }
        return acc;
      }, [])
      .join(",");
    if (!strFields.length) {
      return "";
    }
    return `GROUP BY ${strFields}`;
  }

  makeOrderBy(orderBy, index, alias = "") {
    if (!orderBy) {
      return ["", [], index];
    }
    const orderByArgs = [];
    const orderByStr = Object.entries(orderBy || {})
      .reduce((acc, [key, value]) => {
        if (!!this.columns[key]) {
          acc.push(
            ` ${alias ? `${alias}.` : ""}${key}  ${
              DB.allowedOrderDirectionsKeys[value] || "ASC"
            }`
          );
        } else if (value instanceof SQL) {
          const [sql, args, idx] = value.__getSQL({
            column: key,
            alias: alias || this.table,
            index,
          });
          orderByArgs.push(...args);
          index = idx;
          acc.push(sql);
        } else if (DB.getIsAggregate(key)) {
          const sql = this.getAggregationForSorting({ [key]: value }, alias);
          if (sql) {
            acc.push(sql);
          }
        }

        return acc;
      }, [])
      .join(",");

    return [orderByStr ? ` ORDER BY ${orderByStr} ` : "", orderByArgs, index];
  }

  makeLimit(limit, index) {
    if (DB.isNullOrUndefinedOrEmpty(limit)) {
      return ["", [], index];
    }

    return [`LIMIT $${index}`, [limit], index + 1];
  }

  makeOffset(offset, index) {
    if (DB.isNullOrUndefinedOrEmpty(offset)) {
      return ["", [], index];
    }

    return [`OFFSET $${index}`, [offset], index + 1];
  }

  getAggregationForSorting(orderBy, currentAlias) {
    if (!DB.isObject(orderBy)) {
      return "";
    }
    const columnsForOrdering = Object.keys(orderBy).reduce((acc, key) => {
      const isAggregation = DB.getIsAggregate(key);
      if (!isAggregation) {
        return acc;
      }
      const relationalAlias = DB.getRelationNameWithoutAggregate(key);
      const relation = this.relations?.[relationalAlias];

      if (!relation) {
        return acc;
      }
      const currModel = DB.getRelatedModel(relation);
      if (!currModel) {
        return acc;
      }

      acc = acc.concat(
        currModel.produceOrderByForAggregations(
          orderBy[key],
          currentAlias,
          relation
        )
      );
      return acc;
    }, []);

    return columnsForOrdering.join(",");
  }

  combineOrderBy(orderByColumnsString, orderByAggregationsString) {
    if (!orderByAggregationsString && !orderByColumnsString) {
      return "";
    }
    return `ORDER BY ${orderByColumnsString} ${
      orderByColumnsString && orderByAggregationsString
        ? `,${orderByAggregationsString}`
        : orderByAggregationsString
    }`;
  }

  produceOrderByForAggregations(aggrConfig, prevAlias, relation) {
    const { _count, ...rest } = aggrConfig;

    let queries = [];
    const table = `${this.schema}.${this.table} `;
    const whereClause = `${prevAlias}.${relation.from_column} = ${this.table}.${relation.to_column}`;
    if (_count) {
      queries.push(
        ` (SELECT  COUNT(*) FROM ${table} WHERE ${whereClause} ) ${
          DB.allowedOrderDirectionsKeys[_count] || "ASC"
        }`
      );
    }

    Object.entries(rest).forEach(([key, value]) => {
      if (!SupportedAggregations[key]) {
        throw { message: `Invalid aggregation type ${key}`, status: 400 };
      }
      queries = queries.concat(
        this.toOrderByByAggregationConfig({
          columnsMap: this.columns,
          aggregationKey: SupportedAggregations[key],
          schema: this.schema,
          table,
          whereClause,
          aggrKeyConfig: value,
        })
      );
    });

    return queries;
  }

  toOrderByByAggregationConfig({
    columnsMap,
    aggregationKey,
    aggrKeyConfig,
    schema,
    table,
    whereClause,
  }) {
    return Object.keys(aggrKeyConfig).map((column) => {
      if (!columnsMap[column]) {
        throw { message: `Column ${column} doesn't exist`, status: 400 };
      }
      return `(SELECT ${aggregationKey}(${column}) FROM ${schema}.${table} WHERE ${whereClause}) ${
        DB.allowedOrderDirectionsKeys[aggrKeyConfig[column]] || "ASC"
      }`;
    });
  }

  makeColumnAlias(col) {
    if (col?.name?.startsWith(`${this.table}.`)) {
      return col;
    }

    return `${this.table}.${col.name}`;
  }

  makeDepthAlias(alias, depth) {
    return `_${depth}_${alias}`;
  }

  splitRelationalAndModelColumnsInput(args, allowedEntries = []) {
    return Object.entries(args).reduce(
      (acc, [key, value]) => {
        if (!this.columns[key] && !this.relations[key]) {
          if (!allowedEntries.length) {
            return acc;
          }
        }

        if (this.columns[key]) {
          acc[0][key] = value;
        } else if (allowedEntries.indexOf(key) !== -1) {
          acc[0][key] = value;
        } else {
          acc[1][key] = value;
        }

        return acc;
      },
      [{}, {}]
    );
  }

  getModelColumnsCommaSeperatedString(alias, select, extras) {
    if (DB.isObject(select)) {
      let columns = Object.values(this.columns)
        .filter((c) => !!select[c.column])
        .map((c) => `${alias ? alias : this.table}.${c.column}`);
      if (extras && DB.isObject(extras)) {
        columns = columns.concat(
          Object.values(extras)
            .filter((x) => typeof x === "function")
            .map((x) => x(alias || this.table))
        );
      }
      if (columns.length > 0) {
        return columns.join(",");
      }
    }

    if (extras && DB.isObject(extras)) {
      return Object.values(this.columns)
        .map((c) => `${alias ? alias : this.table}.${c.column}`)
        .concat(
          Object.values(extras)
            .filter((x) => typeof x === "function")
            .map((x) => x(alias || this.table))
        )
        .join(",");
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

  static register(model) {
    const invoked = new model();
    if (!DB.models[invoked.schema]) {
      DB.models[invoked.schema] = {};
      DB.modelFactory[invoked.schema] = {};
    }
    DB.models[invoked.schema][invoked.table] = new model();
    DB.modelFactory[invoked.schema][invoked.table] = model;
    const aggModel = new model();
    aggModel.isAggregate = true;
    DB.models[invoked.schema][`${invoked.table}_aggregate`] = aggModel;
  }

  static registerDatabase(db) {
    DB.database = db;
  }

  static enablePOSTGIS(value = true) {
    DB.postgis = value;
  }

  static registerConnectionConfig(connectionConfig = {}) {
    if (DB.pool) {
      DB.pool.end();
    }
    const { native, replicas, ...rest } = connectionConfig;
    DB.connectionConfig = {
      ...DB.connectionConfig,
      ...rest,
    };
    const poolInstance = native ? pg.native.Pool : Pool;
    DB.pool = new poolInstance(DB.connectionConfig);
    DB.replicas = Array.isArray(replicas)
      ? (replicas || [])
          .filter(Boolean)
          .map((replica) => new poolInstance(replica))
      : [];
    if (rest.schema) {
      DB.registerDatabase(rest?.schema);
    }
  }

  static getRelatedModel(relation) {
    return DB.models?.[relation?.schema || DB.database]?.[relation.to_table];
  }

  getRelatedModelByAlias(alias) {
    return this?.relations?.[alias];
  }

  static getIsAggregate(alias) {
    return alias?.endsWith("_aggregate");
  }

  static getRelationNameWithoutAggregate(alias) {
    if (!alias) {
      return "";
    }
    return alias.split("_aggregate")[0];
  }

  static isObject(value) {
    return (
      !this.isNullOrUndefined(value) &&
      !Array.isArray(value) &&
      typeof value === "object"
    );
  }

  static isUndefined(value) {
    return typeof value === "undefined";
  }

  static isNull(value) {
    return (
      value === null ||
      (this.isString(value) && value?.toLowerCase()?.trim() === "null")
    );
  }

  static isString(value) {
    return typeof value === "string";
  }

  static isNullOrUndefined(value) {
    return this.isNull(value) || this.isUndefined(value);
  }

  static isNullOrUndefinedOrEmpty(value) {
    return this.isNull(value) || this.isUndefined(value) || value === "";
  }

  static onSelect(table, cb) {
    DB.events[DB.EventNameSpaces.SELECT][table] = cb;
  }

  static onInsert(table, cb) {
    DB.events[DB.EventNameSpaces.INSERT][table] = cb;
  }

  static onUpdate(table, cb) {
    DB.events[DB.EventNameSpaces.UPDATE][table] = cb;
  }

  static onDelete(table, cb) {
    DB.events[DB.EventNameSpaces.DELETE][table] = cb;
  }

  static onError(table, cb) {
    DB.events[DB.EventNameSpaces.ERROR][table] = cb;
  }

  static onSelectAsync(table, cb) {
    DB.asyncEvents[DB.EventNameSpaces.SELECT][table] = cb;
  }

  static onInsertAsync(table, cb) {
    DB.asyncEvents[DB.EventNameSpaces.INSERT][table] = cb;
  }

  static onUpdateAsync(table, cb) {
    DB.asyncEvents[DB.EventNameSpaces.UPDATE][table] = cb;
  }

  static onDeleteAsync(table, cb) {
    DB.asyncEvents[DB.EventNameSpaces.DELETE][table] = cb;
  }

  static onErrorAsync(table, cb) {
    DB.asyncEvents[DB.EventNameSpaces.ERROR][table] = cb;
  }

  static subscriber(event, cb) {
    try {
      return DB.connectClient()
        .then(async () => {
          if (!DB.brokerEvents[event]) {
            DB.brokerEvents[event] = cb;
            await DB.client.query(`LISTEN ${event}`);
            if (!DB.notificationRegistered) {
              DB.notificationRegistered = true;
              DB.client.on("notification", (msg) => {
                const { channel, payload, ...rest } = msg;
                const handler = DB.brokerEvents[channel];
                if (handler) {
                  handler({
                    ...rest,
                    data: JSON.parse(payload),
                    channel,
                  });
                }
              });
            }
          }
          return async () => await DB.client.query(`UNLISTEN ${event}`);
        })
        .catch((err) => {
          console.log(err);

          return async () => await DB.client.query(`UNLISTEN ${event}`);
        });
    } catch (error) {
      return async () => await DB.client.query(`UNLISTEN ${event}`);
    }
  }

  static async notify(event, data) {
    try {
      if (DB.clientConnected) {
        await DB.client.query(`NOTIFY ${event}, '${JSON.stringify(data)}'`);
      }
    } catch (error) {}
  }

  static unsubscribeEvent(event) {
    try {
      if (DB.clientConnected) {
        DB.client
          .query(`UNLISTEN ${event}`)
          .then(async () => {
            delete DB.brokerEvents[event];
            if (!Object.keys(DB.brokerEvents).length) {
              await DB.clientDisconnect();
            }
          })
          .catch((err) => {
            throw err;
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static unsubscribeAllEvents() {
    try {
      if (DB.clientConnected) {
        DB.client
          .query(`UNLISTEN *`)
          .then(async () => {
            DB.brokerEvents = {};
            await DB.clientDisconnect();
          })
          .catch((err) => {
            throw err;
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static executeEvent(table, namespace, data, instance) {
    const handler = DB.events?.[namespace]?.[table];
    if (!handler) {
      return null;
    }
    handler(data, instance);
  }

  static async executeAsyncEvent(table, namespace, data, instance) {
    const handler = DB.asyncEvents?.[namespace]?.[table];
    if (!handler) {
      return null;
    }

    await handler(data, instance);
  }

  static eventExists(table, namespace) {
    return !!DB.events[namespace][table];
  }

  static asyncEventExists(table, namespace) {
    return !!DB.asyncEvents[namespace][table];
  }

  static paginator(page, view, total) {
    page = +page;
    if (isNaN(page) || page <= 0) page = 1;
    view = +view;
    if (isNaN(view) || [1, 5, 10, 12, 25, 50, 100].indexOf(view) === -1)
      view = 10;
    total = +total;
    const limit = Math.ceil(total / view);

    if (page > limit) page = limit;
    if (page <= 0) page = 1;
    return {
      total,
      view,
      page,
      skip: (page - 1) * view,
      limit,
      per_page: view,
    };
  }

  static loadApi(callback) {
    Object.entries(DB.modelFactory).map(callback);
  }

  static runJob({ seconds = 0.001, execPath, isPromise = false, log = false }) {
    DB.scheduler.schedule({ exec: execPath, seconds, isPromise, log });
  }
  static getDriver() {
    return pg;
  }
}

module.exports = DB;
