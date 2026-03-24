const SQL = require("./sql");

class JSONBaseOperator {
  constructor(column, path) {
    this.column = column;
    this.path = Array.isArray(path) ? path : [path];
  }

  __toPath(path) {
    const formattedPath = Array.isArray(path) ? path : [path];
    if (!formattedPath.length) throw new Error("Path is required");
    return [
      formattedPath.length > 1 ? formattedPath : formattedPath[0],
      formattedPath.length > 1,
    ];
  }

  toAliasedColumn(args) {
    return `${args?.alias ? `"${args.alias}".` : ""}"${this.column}"`;
  }
}

class JSONSerializer {
  static jsonb(value) {
    if (value === null) return "null";
    if (typeof value === "string") {
      try {
        JSON.parse(value);
        return value;
      } catch {
        return JSON.stringify(value);
      }
    }
    return JSON.stringify(value);
  }

  static json(value) {
    return this.jsonb(value);
  }
}

class JSONBSetOperator extends JSONBaseOperator {
  constructor(column, path, value, createMissingKeys = false) {
    super(column, path);
    this.value = value;
    this.createMissingKeys = createMissingKeys;
  }

  toSQL() {
    const sql = new SQL((args) => {
      const aliasedColumn = this.toAliasedColumn(args);

      return [
        `JSONB_SET(${aliasedColumn}, %v::text[], %v::jsonb, ${this.createMissingKeys})`,
        [this.path, JSONSerializer.jsonb(this.value)],
      ];
    });
    return sql;
  }
}

class JSONBUnsetOperator extends JSONBaseOperator {
  constructor(column, path) {
    super(column, path);
  }

  toSQL() {
    const [formattedPath, isArray] = this.__toPath(this.path);
    const sql = new SQL((args) => {
      const aliasedColumn = this.toAliasedColumn(args);
      return [
        `${aliasedColumn} ${isArray ? `#-` : `-`} %v::${
          isArray ? "text[]" : "text"
        }`,
        [formattedPath],
      ];
    });
    return sql;
  }
}

class JSONUnsetOperator extends JSONBaseOperator {
  constructor(column, path) {
    super(column, path);
  }

  toSQL() {
    const [formattedPath, isArray] = this.__toPath(this.path);
    const sql = new SQL((args) => {
      const aliasedColumn = this.toAliasedColumn(args);
      return [
        `${aliasedColumn} ${isArray ? `#-` : `-`} %v:: ${
          isArray ? "text[]" : "text"
        }`,
        [formattedPath],
      ];
    });
    return sql;
  }
}

class JSONBInsertOperator extends JSONBaseOperator {
  constructor(column, path, value, insertAfter = false) {
    super(column, path);
    this.value = value;
    this.insertAfter = insertAfter;
  }

  toSQL() {
    const sql = new SQL((args) => {
      const aliasedColumn = this.toAliasedColumn(args);
      return [
        `jsonb_insert(${aliasedColumn}, %v::text[], %v::jsonb, ${this.insertAfter})`,
        [this.path, JSONSerializer.jsonb(this.value)],
      ];
    });
    return sql;
  }
}

class JSONBMergeOperator extends JSONBaseOperator {
  constructor(column, value) {
    super(column);
    this.value = value;
  }

  toSQL() {
    return new SQL((args) => {
      const aliasedColumn = this.toAliasedColumn(args);
      return [
        `${aliasedColumn} || %v::jsonb`,
        [JSONSerializer.jsonb(this.value)],
      ];
    });
  }
}

class JSONBArrayAppendOperator extends JSONBaseOperator {
  constructor(column, path, value) {
    super(column, path);
    this.value = value;
  }
  toSQL() {
    return new SQL((args) => {
      const aliasedColumn = this.toAliasedColumn(args);

      return [
        `jsonb_set(
          ${aliasedColumn},
          %v::text[],
          COALESCE(${aliasedColumn}#>%v::text[], '[]'::jsonb) || %v::jsonb,
          false
       )`,
        [this.path, this.path, JSONSerializer.jsonb(this.value)],
      ];
    });
  }
}

class JSONBCounterOperator extends JSONBaseOperator {
  constructor(column, path, delta = 1) {
    super(column, path);
    this.delta = delta; // can be negative for decrement
  }

  toSQL() {
    return new SQL((args) => {
      const col = this.toAliasedColumn(args);
      const path = this.path;
      return [
        `jsonb_set(
          ${col},
          %v::text[],
          to_jsonb((COALESCE(${col}#>%v::text[], '0')::numeric) + ${this.delta}),
          true
        )`,
        [path, path],
      ];
    });
  }
}

class JSONBBooleanToggleOperator extends JSONBaseOperator {
  constructor(column, path) {
    super(column, path);
  }

  toSQL() {
    return new SQL((args) => {
      const col = this.toAliasedColumn(args);
      const path = this.path;

      return [
        `jsonb_set(
          ${col},
          %v::text[],
          to_jsonb(NOT COALESCE(${col}#>%v::text[], 'false')::boolean),
          true
        )`,
        [path, path],
      ];
    });
  }
}

class JSONBArrayMultiAppendOperator extends JSONBaseOperator {
  constructor(column, path, values) {
    super(column, path);
    this.values = Array.isArray(values) ? values : [values];
  }

  toSQL() {
    return new SQL((args) => {
      const col = this.toAliasedColumn(args);
      const jsonValues = JSONSerializer.jsonb(this.values);
      return [
        `jsonb_set(
          ${col},
          %v::text[],
          COALESCE(${col}#>%v::text[], '[]'::jsonb) || %v::jsonb,
          true
        )`,
        [this.path, this.path, jsonValues],
      ];
    });
  }
}

class JSONBArrayPrependOperator extends JSONBaseOperator {
  constructor(column, path, value) {
    super(column, path);
    this.value = value;
  }

  toSQL() {
    return new SQL((args) => {
      const aliasedColumn = this.toAliasedColumn(args);

      return [
        `jsonb_set(
          ${aliasedColumn},
          %v::text[],
          %v::jsonb || COALESCE(${aliasedColumn}#>%v::text[], '[]'::jsonb),
          false
        )`,
        [this.path, JSONSerializer.jsonb(this.value), this.path],
      ];
    });
  }
}

class JSONBArrayMultiPrependOperator extends JSONBaseOperator {
  constructor(column, path, values) {
    super(column, path);
    this.values = Array.isArray(values) ? values : [values];
  }

  toSQL() {
    return new SQL((args) => {
      const col = this.toAliasedColumn(args);
      const jsonValues = JSONSerializer.jsonb(this.values);
      const path = this.path;

      return [
        `jsonb_set(
          ${col},
          %v::text[],
          %v::jsonb || COALESCE(${col}#>%v::text[], '[]'::jsonb),
          true
        )`,
        [path, jsonValues, path],
      ];
    });
  }
}

class JSONBArrayRemoveAtOperator extends JSONBaseOperator {
  constructor(column, path, index) {
    super(column, path);
    this.index = index;
  }

  toSQL() {
    return new SQL((args) => {
      const col = this.toAliasedColumn(args);
      const path = this.path;

      return [
        `jsonb_set(
          ${col},
          %v::text[],
          (${col}#>%v::text[]) - ${this.index},
          true
        )`,
        [path, path],
      ];
    });
  }
}

class JsonUpdateOperators {
  static setJsonb(column, path, value, createMissingKeys = false) {
    return new JSONBSetOperator(column, path, value, createMissingKeys).toSQL();
  }
  static unsetJsonb(column, path) {
    return new JSONBUnsetOperator(column, path).toSQL();
  }

  static unsetJson(column, path) {
    return new JSONUnsetOperator(column, path).toSQL();
  }
  static insertJsonb(column, path, value, insertAfter = false) {
    return new JSONBInsertOperator(column, path, value, insertAfter).toSQL();
  }

  static mergeJsonb(column, value) {
    return new JSONBMergeOperator(column, value).toSQL();
  }

  static arrayAppendJsonb(column, path, value) {
    return new JSONBArrayAppendOperator(column, path, value).toSQL();
  }
  static counterJsonb(column, path, delta = 1) {
    return new JSONBCounterOperator(column, path, delta).toSQL();
  }
  static booleanToggleJsonb(column, path) {
    return new JSONBBooleanToggleOperator(column, path).toSQL();
  }
  static arrayMultiAppendJsonb(column, path, values) {
    return new JSONBArrayMultiAppendOperator(column, path, values).toSQL();
  }
  static arrayPrependJsonb(column, path, value) {
    return new JSONBArrayPrependOperator(column, path, value).toSQL();
  }
  static arrayRemoveAtJsonb(column, path, index) {
    return new JSONBArrayRemoveAtOperator(column, path, index).toSQL();
  }
  static arrayMultiPrependJsonb(column, path, values) {
    return new JSONBArrayMultiPrependOperator(column, path, values).toSQL();
  }
}

class JSONBCompareOperator extends JSONBaseOperator {
  constructor(column, path, value, operator = "=") {
    super(column, path);
    this.value = value;
    this.operator = operator;
  }

  toSQL() {
    return new SQL((args) => {
      const col = this.toAliasedColumn(args);
      const [path, isArray] = this.__toPath(this.path);

      const accessor = isArray ? `#>` : `->`;
      const formattedPath = isArray ? `%v::text[]` : `'${path}'`;

      return [
        `${col}${accessor}${formattedPath} ${this.operator} %v`,
        [isArray ? path : null, JSONSerializer.jsonb(this.value)].filter(
          Boolean,
        ),
      ];
    });
  }
}

class JSONCompareOperator extends JSONBaseOperator {
  constructor(column, path, value, operator = "=") {
    super(column, path);
    this.value = value;
    this.operator = operator;
  }

  toSQL() {
    return new SQL((args) => {
      const col = this.toAliasedColumn(args);
      const [path, isArray] = this.__toPath(this.path);

      const accessor = isArray ? `#>` : `->`;
      const formattedPath = isArray ? `%v::text[]` : `'${path}'`;

      return [
        `${col}${accessor}${formattedPath} ${this.operator} %v`,
        [isArray ? path : null, JSONSerializer.json(this.value)].filter(
          Boolean,
        ),
      ];
    });
  }
}

class JSONBEqualsOperator extends JSONBCompareOperator {
  constructor(column, path, value) {
    super(column, path, value, "=");
  }
}

class JSONEqualsOperator extends JSONCompareOperator {
  constructor(column, path, value) {
    super(column, path, value, "=");
  }
}

class JSONBNotEqualsOperator extends JSONBCompareOperator {
  constructor(column, path, value) {
    super(column, path, value, "!=");
  }
}

class JSONNotEqualsOperator extends JSONCompareOperator {
  constructor(column, path, value) {
    super(column, path, value, "!=");
  }
}

class JSONBGreaterThanOperator extends JSONBCompareOperator {
  constructor(column, path, value) {
    super(column, path, value, ">");
  }
}

class JSONGreaterThanOperator extends JSONCompareOperator {
  constructor(column, path, value) {
    super(column, path, value, ">");
  }
}

class JSONBGreaterThanOrEqualOperator extends JSONBCompareOperator {
  constructor(column, path, value) {
    super(column, path, value, ">=");
  }
}

class JSONGreaterThanOrEqualOperator extends JSONCompareOperator {
  constructor(column, path, value) {
    super(column, path, value, ">=");
  }
}

class JSONBLessThanOperator extends JSONBCompareOperator {
  constructor(column, path, value) {
    super(column, path, value, "<");
  }
}

class JSONLessThanOperator extends JSONCompareOperator {
  constructor(column, path, value) {
    super(column, path, value, "<");
  }
}

class JSONBLessThanOrEqualOperator extends JSONBCompareOperator {
  constructor(column, path, value) {
    super(column, path, value, "<=");
  }
}

class JSONLessThanOrEqualOperator extends JSONCompareOperator {
  constructor(column, path, value) {
    super(column, path, value, "<=");
  }
}

class JSONBContainsOperator extends JSONBCompareOperator {
  constructor(column, path, value) {
    super(column, path, value, "?|");
  }

  toSQL() {
    return new SQL((args) => {
      const col = this.toAliasedColumn(args);
      const [path, pathIsMulti] = this.__toPath(this.path);
      const accessor = pathIsMulti ? `#>` : `->`;
      const formattedPath = pathIsMulti ? `%v::text[]` : `'${path}'`;
      const textKeys = Array.isArray(this.value) ? this.value : [this.value];
      const stmt = `${col}${accessor}${formattedPath} ?| %v::text[]`;
      const bindArgs = pathIsMulti ? [path, textKeys] : [textKeys];
      return [stmt, bindArgs];
    });
  }
}

class JSONContainsOperator extends JSONCompareOperator {
  constructor(column, path, value) {
    super(column, path, value, "?|");
  }

  toSQL() {
    return new SQL((args) => {
      const col = this.toAliasedColumn(args);
      const [path, pathIsMulti] = this.__toPath(this.path);
      const accessor = pathIsMulti ? `#>` : `->`;
      const formattedPath = pathIsMulti ? `%v::text[]` : `'${path}'`;
      const textKeys = Array.isArray(this.value) ? this.value : [this.value];
      const stmt = `${col}${accessor}${formattedPath}::jsonb ?| %v::text[]`;
      const bindArgs = pathIsMulti ? [path, textKeys] : [textKeys];
      return [stmt, bindArgs];
    });
  }
}

class JSONBContainedInOperator extends JSONBCompareOperator {
  constructor(column, path, value) {
    super(column, path, value, "<@");
  }
}

class JSONContainedInOperator extends JSONCompareOperator {
  constructor(column, path, value) {
    super(column, path, value, "<@");
  }
}

class JsonWhereClauseOperators {
  static equalsJsonb(column, path, value) {
    return new JSONBEqualsOperator(column, path, value).toSQL();
  }
  static equalsJson(column, path, value) {
    return new JSONEqualsOperator(column, path, value).toSQL();
  }
  static notEqualsJsonb(column, path, value) {
    return new JSONBNotEqualsOperator(column, path, value).toSQL();
  }
  static notEqualsJson(column, path, value) {
    return new JSONNotEqualsOperator(column, path, value).toSQL();
  }
  static greaterThanJsonb(column, path, value) {
    return new JSONBGreaterThanOperator(column, path, value).toSQL();
  }
  static greaterThanJson(column, path, value) {
    return new JSONGreaterThanOperator(column, path, value).toSQL();
  }
  static greaterThanOrEqualJsonb(column, path, value) {
    return new JSONBGreaterThanOrEqualOperator(column, path, value).toSQL();
  }
  static greaterThanOrEqualJson(column, path, value) {
    return new JSONGreaterThanOrEqualOperator(column, path, value).toSQL();
  }
  static lessThanJsonb(column, path, value) {
    return new JSONBLessThanOperator(column, path, value).toSQL();
  }
  static lessThanJson(column, path, value) {
    return new JSONLessThanOperator(column, path, value).toSQL();
  }
  static lessThanOrEqualJsonb(column, path, value) {
    return new JSONBLessThanOrEqualOperator(column, path, value).toSQL();
  }
  static lessThanOrEqualJson(column, path, value) {
    return new JSONLessThanOrEqualOperator(column, path, value).toSQL();
  }
  static containsJsonb(column, path, value) {
    return new JSONBContainsOperator(column, path, value).toSQL();
  }
  static containsJson(column, path, value) {
    return new JSONContainsOperator(column, path, value).toSQL();
  }
  static containedInJsonb(column, path, value) {
    return new JSONBContainedInOperator(column, path, value).toSQL();
  }
  static containedInJson(column, path, value) {
    return new JSONContainedInOperator(column, path, value).toSQL();
  }
}

module.exports = {
  JSONBSetOperator,
  JSONBUnsetOperator,
  JSONUnsetOperator,
  JSONBInsertOperator,
  JSONBMergeOperator,
  JSONBArrayAppendOperator,
  JSONBCounterOperator,
  JSONBBooleanToggleOperator,
  JSONBArrayMultiAppendOperator,
  JSONBArrayPrependOperator,
  JSONBArrayRemoveAtOperator,
  JSONBArrayMultiPrependOperator,
  JsonUpdateOperators,
  JsonWhereClauseOperators,
};
