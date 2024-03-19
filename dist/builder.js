"use strict";

const ValidationService = require("./validation");
class Builder {
  constructor(client) {
    this.args = [];
    this.__subselectContexts = [];
    this.client = client;
  }
  with(sql) {
    return {
      as: this.__as(sql, false)
    };
  }
  __as(previousSQL, isSequential = false, newSQL) {
    return alias => {
      const latestSQL = `${isSequential ? `${previousSQL},` : "with"}  ${alias} as (${isSequential ? newSQL : previousSQL}) `;
      return {
        definition: this.__toSQL(latestSQL),
        raw: this.__raw(latestSQL),
        with: this.__nestedWith(latestSQL),
        select: this.select.bind(this),
        delete: this.delete.bind(this),
        update: this.update.bind(this),
        insert: this.insert.bind(this)
      };
    };
  }
  __nestedWith(previousSQL) {
    return sql => {
      return {
        as: this.__as(previousSQL, true, sql)
      };
    };
  }
  select(columns) {
    return this.__select(columns);
  }
  subSelect(statement, alias) {
    return `(${statement}) ${alias ? `as ${alias}` : ""}`;
  }
  __select(columns) {
    return {
      from: this.__from(columns, true)
    };
  }
  __subSelect(columns) {
    return {
      from: this.__from(columns, false, true)
    };
  }
  __from(columns, canExecute = false) {
    return (table, alias, schema) => {
      const columnsStr = this.__makeColumns(columns, table, alias);
      let sql = `select ${columnsStr} from ${schema ? schema + "." : ""}${table}${alias ? ` ${alias}` : ""}`;
      return {
        leftJoin: this.__joinBuilder("left join", sql, canExecute),
        leftOuterJoin: this.__joinBuilder("left outer join", sql, canExecute),
        innerJoin: this.__joinBuilder("inner join", sql, canExecute),
        rightJoin: this.__joinBuilder("right join", sql, canExecute),
        rightOuterJoin: this.__joinBuilder("right outer join", sql, canExecute),
        groupBy: this.__groupBy(sql, canExecute),
        limit: this.__limit(sql, canExecute),
        offset: this.__offset(sql, canExecute),
        where: this.__where(sql, schema, table, alias, canExecute),
        orderBy: this.__orderBy(sql, canExecute),
        literal: this.__literal(sql, (sql, canExecute) => ({
          leftJoin: this.__joinBuilder("left join", sql, canExecute),
          leftOuterJoin: this.__joinBuilder("left outer join", sql, canExecute),
          innerJoin: this.__joinBuilder("inner join", sql, canExecute),
          rightJoin: this.__joinBuilder("right join", sql, canExecute),
          rightOuterJoin: this.__joinBuilder("right outer join", sql, canExecute),
          groupBy: this.__groupBy(sql, canExecute),
          limit: this.__limit(sql, canExecute),
          offset: this.__offset(sql, canExecute),
          where: this.__where(sql, schema, table, alias, canExecute),
          orderBy: this.__orderBy(sql, canExecute),
          raw: this.__raw(sql)
        }), canExecute),
        raw: this.__raw(sql),
        definition: this.__toSQL(sql),
        ...(canExecute && {
          execute: this.__exec(sql)
        })
      };
    };
  }
  __raw(previousSQL) {
    return (sql, ...args) => {
      this.args.push(...args);
      return `${previousSQL} ${sql || ""}`;
    };
  }
  __joinBuilder(joinType, previousSQL, canExecute) {
    return (table, column, alias, schema) => {
      let toTable = table,
        toColumn = Builder.isBuilderColumn(column) ? column.sql : column,
        toSchema = schema,
        toAlias = alias;
      return {
        on: (table, column, alias, schema) => {
          const sql = `${previousSQL} ${this.__join(joinType, schema, table, column, alias, toSchema, toTable, toColumn, toAlias)}`;
          return {
            leftJoin: this.__joinBuilder("left join", sql, canExecute),
            leftOuterJoin: this.__joinBuilder("left outer join", sql, canExecute),
            innerJoin: this.__joinBuilder("inner join", sql, canExecute),
            rightJoin: this.__joinBuilder("right join", sql, canExecute),
            rightOuterJoin: this.__joinBuilder("right outer join", sql, canExecute),
            groupBy: this.__groupBy(sql, canExecute),
            limit: this.__limit(sql, canExecute),
            offset: this.__offset(sql, canExecute),
            where: this.__where(sql, schema, table, alias, canExecute),
            orderBy: this.__orderBy(sql, canExecute),
            literal: this.__literal(sql, (sql, canExecute) => ({
              leftJoin: this.__joinBuilder("left join", sql, canExecute),
              leftOuterJoin: this.__joinBuilder("left outer join", sql, canExecute),
              innerJoin: this.__joinBuilder("inner join", sql, canExecute),
              rightJoin: this.__joinBuilder("right join", sql, canExecute),
              rightOuterJoin: this.__joinBuilder("right outer join", sql, canExecute),
              groupBy: this.__groupBy(sql, canExecute),
              limit: this.__limit(sql, canExecute),
              offset: this.__offset(sql, canExecute),
              where: this.__where(sql, schema, table, alias, canExecute),
              orderBy: this.__orderBy(sql, canExecute),
              raw: this.__raw(sql)
            }), canExecute),
            raw: this.__raw(sql),
            definition: this.__toSQL(sql),
            ...(canExecute && {
              execute: this.__exec(sql)
            })
          };
        }
      };
    };
  }
  __join(joinType, from_schema, from_table, from_column, from_alias, to_schema, to_table, to_column, to_alias, operator, extra) {
    const mergeFN = Builder.__mergeSQLPath(".");
    return `${joinType || "inner join"} ${mergeFN(to_schema, to_table)}${to_alias ? ` ${to_alias}` : ""} on ${mergeFN(to_alias || to_table, Builder.isBuilderColumn(to_column) ? to_column.sql : to_column)} ${operator || "="} ${from_alias ? mergeFN(from_alias, Builder.isBuilderColumn(from_column) ? from_column.sql : from_column) : mergeFN(from_schema, from_table, Builder.isBuilderColumn(from_column) ? from_column.sql : from_column)}${extra ? ` ${extra}` : ""}`;
  }
  __groupBy(previousSql, canExecute) {
    return columns => {
      if (this.__columnsInputIsEligible(columns)) {
        const columnsStr = this.__makeColumns(columns, undefined, undefined);
        previousSql += ` group by ${columnsStr}`;
      }
      return {
        having: this.__having(previousSql, canExecute),
        limit: this.__limit(previousSql, canExecute),
        offset: this.__offset(previousSql, canExecute),
        orderBy: this.__orderBy(previousSql, canExecute),
        literal: this.__literal(previousSql, (sql, canExecute) => ({
          having: this.__having(sql, canExecute),
          limit: this.__limit(sql, canExecute),
          offset: this.__offset(sql, canExecute),
          orderBy: this.__orderBy(sql, canExecute),
          raw: this.__raw(sql)
        }), canExecute),
        definition: this.__toSQL(previousSql),
        raw: this.__raw(previousSql),
        ...(canExecute && {
          execute: this.__exec(previousSql)
        })
      };
    };
  }
  __limit(previousSQL, canExecute) {
    return limit => {
      const formattedLimit = isNaN(limit) ? -1 : parseInt(limit);
      if (formattedLimit >= 0) {
        previousSQL += ` limit ?`;
        this.args.push(formattedLimit);
      }
      return {
        offset: this.__offset(previousSQL, canExecute),
        definition: this.__toSQL(previousSQL),
        literal: this.__literal(previousSQL, (sql, canExecute) => ({
          offset: this.__offset(sql, canExecute),
          raw: this.__raw(sql)
        }), canExecute),
        raw: this.__raw(previousSQL),
        ...(canExecute && {
          execute: this.__exec(previousSQL)
        })
      };
    };
  }
  __offset(previousSQL, canExecute) {
    return offset => {
      const formattedOffset = isNaN(offset) ? -1 : parseInt(offset);
      if (formattedOffset >= 0) {
        previousSQL += ` offset ?`;
        this.args.push(formattedOffset);
      }
      return {
        definition: this.__toSQL(previousSQL),
        literal: this.__literal(previousSQL, (sql, canExecute) => ({
          offset: this.__offset(sql, canExecute),
          raw: this.__raw(sql)
        }), canExecute),
        raw: this.__raw(previousSQL),
        ...(canExecute && {
          execute: this.__exec(previousSQL)
        })
      };
    };
  }
  __having(previousSQL, canExecute) {
    return (...conditions) => {
      let sql = previousSQL;
      if (conditions.length) {
        sql += " having ";
        for (let i = 0; i < conditions.length; i++) {
          const [sqlPart, sqlArgs] = conditions[i](i === 0 ? "" : "and", i === 0);
          sql += ` ${sqlPart}`;
          this.args.push(...sqlArgs);
        }
      }
      return {
        definition: this.__toSQL(sql),
        raw: this.__raw(sql),
        orderBy: this.__orderBy(sql, canExecute),
        limit: this.__limit(sql, canExecute),
        offset: this.__offset(sql, canExecute),
        literal: this.__literal(previousSQL, (sql, canExecute) => ({
          orderBy: this.__orderBy(sql, canExecute),
          limit: this.__limit(sql, canExecute),
          offset: this.__offset(sql, canExecute),
          raw: this.__raw(sql)
        }), canExecute),
        ...(canExecute && {
          execute: this.__exec(previousSQL)
        })
      };
    };
  }
  __where(previousSQL, schema, table, alias, canExecute = false) {
    return (...config) => {
      let sql = previousSQL;
      if (!config?.length) {
        return {
          definition: this.__toSQL(sql),
          literal: this.__literal(sql, (sql, canExecute) => ({
            groupBy: this.__groupBy(sql, canExecute),
            limit: this.__limit(sql, canExecute),
            offset: this.__offset(sql, canExecute),
            orderBy: this.__orderBy(sql, canExecute),
            raw: this.__raw(sql)
          }), canExecute),
          ...(canExecute && {
            execute: this.__exec(sql)
          }),
          groupBy: this.__groupBy(sql, canExecute),
          limit: this.__limit(sql, canExecute),
          offset: this.__offset(sql, canExecute),
          orderBy: this.__orderBy(sql, canExecute),
          raw: this.__raw(sql)
        };
      }
      sql += ` where `;
      for (let i = 0; i < config.length; i++) {
        const [sqlPart, sqlArgs] = config[i](i === 0 ? "" : "and", i === 0);
        sql += ` ${sqlPart}`;
        this.args.push(...sqlArgs);
      }
      return {
        definition: this.__toSQL(sql),
        literal: this.__literal(sql, (sql, canExecute) => ({
          groupBy: this.__groupBy(sql, canExecute),
          limit: this.__limit(sql, canExecute),
          offset: this.__offset(sql, canExecute),
          orderBy: this.__orderBy(sql, canExecute),
          raw: this.__raw(sql)
        }), canExecute),
        ...(canExecute && {
          execute: this.__exec(sql)
        }),
        groupBy: this.__groupBy(sql, canExecute),
        limit: this.__limit(sql, canExecute),
        offset: this.__offset(sql, canExecute),
        orderBy: this.__orderBy(sql, canExecute),
        raw: this.__raw(sql)
      };
    };
  }
  __whereStatement(previousSQL, schema, table, alias, canExecute = false) {
    return (...config) => {
      let sql = previousSQL;
      if (!config?.length) {
        return {
          definition: this.__toSQL(sql),
          raw: this.__raw(sql),
          ...(canExecute && {
            execute: this.__exec(sql)
          }),
          returning: this.__returning(sql)
        };
      }
      sql += ` where `;
      for (let i = 0; i < config.length; i++) {
        const [sqlPart, sqlArgs] = config[i](i === 0 ? "" : "and", i === 0);
        sql += ` ${sqlPart}`;
        this.args.push(...sqlArgs);
      }
      return {
        definition: this.__toSQL(sql),
        ...(canExecute && {
          execute: this.__exec(sql)
        }),
        raw: this.__raw(sql),
        returning: this.__returning(sql)
      };
    };
  }
  __orderBy(previousSQL, canExecute = false) {
    return (...columns) => {
      if (!columns.length) {
        return {
          raw: this.__raw(previousSQL),
          ...(canExecute && {
            execute: this.__exec(previousSQL)
          })
        };
      }
      const sql = `${previousSQL} order by ${columns.join(",")}`;
      return {
        definition: this.__toSQL(sql),
        raw: this.__raw(sql),
        ...(canExecute && {
          execute: this.__exec(sql)
        })
      };
    };
  }
  insert(table, schema) {
    const mergeFN = Builder.__mergeSQLPath(".");
    let sql = `insert into ${mergeFN(schema, table)}`;
    return {
      values: this.__insert_values(sql)
    };
  }
  __insert_values(previousSQL) {
    return (...input) => {
      const args = input.filter(x => ValidationService.isObject(x));
      if (!args.length) {
        return {
          definition: this.__toSQL(previousSQL)
        };
      }
      const allKeys = {};
      for (let i = 0; i < args.length; i++) {
        const keys = Object.keys(args[i] || {});
        for (let key of keys) {
          if (!allKeys[key]) {
            allKeys[key] = column(key).sql;
          }
        }
      }
      const allColumnsKeys = Object.keys(allKeys);
      let sql = `${previousSQL}(${Object.values(allKeys).join(",")}) values `;
      const allSqlStrs = args.map(entry => {
        this.args.push(...Object.values(entry));
        return `(${allColumnsKeys.map(x => entry.hasOwnProperty(x) ? `?` : "default").join(",")})`;
      });
      sql += `${allSqlStrs.join(",")}`;
      return {
        raw: this.__raw(sql),
        onConflict: this.__onConflictInsert(sql),
        returning: this.__returning(sql),
        execute: this.__exec(sql),
        definition: this.__toSQL(sql)
      };
    };
  }
  __onConflictInsert(previousSQL) {
    return (...constraints) => {
      const constraintsSTR = this.__makeColumns(constraints);
      if (!constraintsSTR.length || constraintsSTR === "*") {
        return {
          returning: this.__returning(previousSQL),
          execute: this.__exec(previousSQL),
          definition: this.__toSQL(previousSQL)
        };
      }
      const sql = `${previousSQL} on conflict (${constraintsSTR}) `;
      return {
        raw: this.__raw(sql),
        ignore: this.__ignoreInsert(sql),
        update: this.__updateInsert(sql),
        definition: this.__toSQL(sql)
      };
    };
  }
  __ignoreInsert(previousSQL) {
    return () => {
      let sql = `${previousSQL} do nothing `;
      return {
        raw: this.__raw(sql),
        returning: this.__returning(sql),
        execute: this.__exec(sql),
        definition: this.__toSQL(sql)
      };
    };
  }
  __updateInsert(previousSQL) {
    return update => {
      let sql = `${previousSQL} do update set `;
      const sqlStr = Object.entries(update).map(([key, value]) => {
        if (Builder.isConflictingColumn(value)) {
          return `${key} = ${value.sql}`;
        }
        return `${key} = ?`;
      }).join(", ");
      sql += sqlStr;
      return {
        raw: this.__raw(sql),
        returning: this.__returning(sql),
        execute: this.__exec(sql),
        definition: this.__toSQL(sql)
      };
    };
  }
  __returning(previousSQL) {
    return (...columns) => {
      const columnsStr = this.__makeColumns(columns);
      let sql = `${previousSQL} returning ${columnsStr}`;
      return {
        raw: this.__raw(sql),
        execute: this.__exec(sql),
        definition: this.__toSQL(sql)
      };
    };
  }
  __literal(previousSQL, next, canExecute) {
    return (sql, args = []) => {
      if (sql) {
        previousSQL += ` ${sql} `;
        if (Array.isArray(args)) {
          this.args.push(...args);
        }
      }
      const nextFNs = next(previousSQL, canExecute);
      if (canExecute) {
        nextFNs.execute = this.__exec(previousSQL);
      }
      nextFNs.definition = this.__toSQL(previousSQL);
      return nextFNs;
    };
  }
  update(table, schema) {
    const mergeFN = Builder.__mergeSQLPath(".");
    const sql = `update ${mergeFN(schema, table)}`;
    return {
      set: this.__updateSet(sql)
    };
  }
  __updateSet(previousSQL) {
    return input => {
      if (!ValidationService.isObject(input) || !Object.keys(input).length) {
        throw new Error("update input not provided");
      }
      const sqlParts = Object.entries(input).map(([key, value]) => {
        if (Builder.isUpdateValueLiteral(value)) {
          this.args.push(...value.args);
          return `${key} = ${value.sql}`;
        }
        return `${key} = ?`;
      }).join(", ");
      let sql = `${previousSQL} set ${sqlParts}`;
      return {
        definition: this.__toSQL(sql),
        execute: this.__exec(sql),
        returning: this.__returning(sql),
        where: this.__whereStatement(sql, undefined, undefined, undefined, true)
      };
    };
  }
  delete(table, schema) {
    const mergeFN = Builder.__mergeSQLPath(".");
    const sql = `delete from ${mergeFN(schema, table)}`;
    return {
      where: this.__whereStatement(sql, undefined, undefined, undefined, true),
      returning: this.__returning(sql)
    };
  }
  __toSQL(previousSQL) {
    return () => {
      let index = 0;
      while (previousSQL.includes("?")) {
        previousSQL = previousSQL.replace("?", `$${++index}`);
      }
      return [previousSQL, this.args];
    };
  }
  __exec(previousSQL) {
    return async () => {
      const [sql, args] = this.__toSQL(previousSQL).call(this);
      this.args = [];
      return await this.client.query(sql, args);
    };
  }
  __makeColumns(columns, table, alias) {
    const formattedColumns = Array.isArray(columns) ? columns : [columns];
    const allColumns = formattedColumns.map(x => Builder.isBuilderColumn(x) ? x.sql : x).filter(Boolean);
    return allColumns.length ? allColumns.join(",") : `${alias ? alias + "." : table ? table + "." : ""}*`;
  }
  __columnsInputIsEligible(columns) {
    return Array.isArray(columns) && columns.length || !Array.isArray(columns) && !!columns;
  }
  static __mergeSQLPath(delimiter = ".") {
    return (...args) => {
      if (!args.length) {
        return "";
      }
      return args.filter(Boolean).join(delimiter);
    };
  }
  static isBuilderColumn(val) {
    return val && val?.$builderColumnEntry;
  }
  static isConflictingColumn(val) {
    return val && val.$isConflictingOperation;
  }
  static isUpdateValueLiteral(val) {
    return val && val.$isUpdateLiteral;
  }
  static resolveColumnAndValues(...args) {
    return args.reduce((acc, entry) => {
      if (typeof entry === "object" && Builder.isBuilderColumn(entry)) {
        acc[0].push(entry.sql);
      } else if (typeof entry === "object" && Builder.isUpdateValueLiteral(entry)) {
        acc[0].push(entry.sql);
        acc[1].push(...entry.args);
      } else {
        acc[0].push("?");
        acc[1].push(entry);
      }
      return acc;
    }, [[], []]);
  }
}
function asc(entry) {
  if (Builder.isBuilderColumn(entry)) {
    return `${entry.sql} asc`;
  }
  return `${entry} asc`;
}
function asc_nulls_first(entry) {
  if (Builder.isBuilderColumn(entry)) {
    return `${entry.sql} asc nulls first`;
  }
  return `${entry} asc nulls first`;
}
function asc_nulls_last(entry) {
  if (Builder.isBuilderColumn(entry)) {
    return `${entry.sql} asc nulls last`;
  }
  return `${entry} asc nulls last`;
}
function desc(entry) {
  if (Builder.isBuilderColumn(entry)) {
    return `${entry.sql} desc`;
  }
  return `${entry} desc`;
}
function desc_nulls_first(entry) {
  if (Builder.isBuilderColumn(entry)) {
    return `${entry.sql} desc nulls first`;
  }
  return `${entry} desc nulls first`;
}
function desc_nulls_last(entry) {
  if (Builder.isBuilderColumn(entry)) {
    return `${entry.sql} nulls last`;
  }
  return `${entry} nulls last`;
}
function column(a, alias) {
  return {
    sql: `${Builder.__mergeSQLPath(".")(alias, a)}`,
    $builderColumnEntry: true
  };
}
function excluded(a) {
  return {
    sql: `excluded.${a}`,
    $isConflictingOperation: true
  };
}
function latest(a) {
  return {
    sql: `new.${a}`,
    $isConflictingOperation: true
  };
}
function eq(a, b) {
  return binder => {
    const [sql, args] = Builder.resolveColumnAndValues(a, b);
    return [` ${binder || ""} ${sql.join(" = ")}`, args];
  };
}
function neq(a, b) {
  return binder => {
    const [sql, args] = Builder.resolveColumnAndValues(a, b);
    return [` ${binder || ""} ${sql.join(" <> ")}`, args];
  };
}
function lt(a, b) {
  return binder => {
    const [sql, args] = Builder.resolveColumnAndValues(a, b);
    return [` ${binder || ""} ${sql.join(" < ")}`, args];
  };
}
function lte(a, b) {
  return binder => {
    const [sql, args] = Builder.resolveColumnAndValues(a, b);
    return [` ${binder || ""} ${sql.join(" <= ")}`, args];
  };
}
function gt(a, b) {
  return binder => {
    const [sql, args] = Builder.resolveColumnAndValues(a, b);
    return [` ${binder || ""} ${sql.join(" > ")}`, args];
  };
}
function gte(a, b) {
  return binder => {
    const [sql, args] = Builder.resolveColumnAndValues(a, b);
    return [` ${binder || ""} ${sql.join(" >= ")}`, args];
  };
}
function isNull(a) {
  return binder => {
    const [sql, args] = Builder.resolveColumnAndValues(a, null);
    return [` ${binder || ""} ${sql.join(" is ")}`, args];
  };
}
function isNotNull(a) {
  return binder => {
    const [sql, args] = Builder.resolveColumnAndValues(a, null);
    return [` ${binder || ""} ${sql.join(" is not ")}`, args];
  };
}
function inArray(column, ...queryArgs) {
  return binder => {
    return [` ${binder || ""} ${Builder.isBuilderColumn(column) ? column.sql : column} in(?)`, queryArgs];
  };
}
function notInArray(column, ...queryArgs) {
  return binder => {
    return [` ${binder || ""} ${Builder.isBuilderColumn(column) ? column.sql : column} in(?)`, queryArgs];
  };
}
function inSelect(column, b) {
  return binder => {
    return [` ${binder || ""} ${Builder.isBuilderColumn(column) ? column.sql : column} in (${b})`, []];
  };
}
function notInSelect(a, b) {
  return binder => {
    return [` ${binder || ""} ${Builder.isBuilderColumn(column) ? column.sql : column} not  in (${b})`, []];
  };
}
function rawCondition(sql, args = []) {
  return binder => {
    return [` ${binder || ""} ${sql || ""}`, Array.isArray(args) ? args : []];
  };
}
function and(...args) {
  return (binder, isFirstEntry = true) => {
    if (!args.length) {
      return ["", []];
    }
    let initialSql = `${binder || ""} (`;
    let queryArgs = [];
    let prepend = "";
    for (let entry of args) {
      const [sql, args] = entry(prepend, !prepend);
      initialSql += sql;
      prepend = " and ";
      queryArgs.push(...args);
    }
    initialSql += " ) ";
    return [initialSql, queryArgs];
  };
}
function or(...args) {
  return (binder, isFirstEntry = true) => {
    if (!args.length) {
      return ["", []];
    }
    let initialSql = `${binder || ""} (`;
    let queryArgs = [];
    let prepend = "";
    for (let entry of args) {
      const [sql, args] = entry(prepend, !prepend);
      initialSql += sql;
      prepend = " or ";
      queryArgs.push(...args);
    }
    initialSql += " ) ";
    return [initialSql, queryArgs];
  };
}
function valueLiteral(sql, args = []) {
  return {
    $isUpdateLiteral: true,
    sql,
    args: Array.isArray(args) ? args : [args]
  };
}
Builder.prototype.valueLiteral = valueLiteral;
Builder.prototype.column = column;
Builder.prototype.eq = eq;
Builder.prototype.neq = neq;
Builder.prototype.lt = lt;
Builder.prototype.lte = lte;
Builder.prototype.gt = gt;
Builder.prototype.gte = gte;
Builder.prototype.and = and;
Builder.prototype.or = or;
Builder.prototype.asc = asc;
Builder.prototype.desc = desc;
Builder.prototype.asc_nulls_first = asc_nulls_first;
Builder.prototype.asc_nulls_last = asc_nulls_last;
Builder.prototype.desc_nulls_first = desc_nulls_first;
Builder.prototype.desc_nulls_last = desc_nulls_last;
Builder.prototype.isNull = isNull;
Builder.prototype.isNotNull = isNotNull;
Builder.prototype.rawCondition = rawCondition;
Builder.prototype.inArray = inArray;
Builder.prototype.notInArray = notInArray;
Builder.prototype.inSelect = inSelect;
Builder.prototype.notInSelect = notInSelect;
Builder.prototype.excluded = excluded;
Builder.prototype.latest = latest;
class BaseSQL {
  constructor(client) {
    this.builder = new Builder(client);
  }
  with(sql) {
    return this.builder.with(sql);
  }
}
class Query extends BaseSQL {
  constructor(client) {
    super(client);
  }
  select(columns) {
    return this.builder.select(columns);
  }
  subSelect(sql, alias) {
    return this.builder.subSelect(sql, alias);
  }
}
class Statement extends BaseSQL {
  constructor(client) {
    super(client);
  }
  insert(table, schema) {
    return this.builder.insert(table, schema);
  }
  update(table, schema) {
    return this.builder.update(table, schema);
  }
  delete(table, schema) {
    return this.builder.delete(table, schema);
  }
}
module.exports = {
  Builder,
  BaseSQL,
  Query,
  Statement,
  asc,
  asc_nulls_first,
  asc_nulls_last,
  desc,
  desc_nulls_first,
  desc_nulls_last,
  column,
  excluded,
  latest,
  eq,
  neq,
  lt,
  lte,
  gt,
  gte,
  isNull,
  isNotNull,
  inArray,
  notInArray,
  inSelect,
  notInSelect,
  rawCondition,
  and,
  or,
  valueLiteral
};