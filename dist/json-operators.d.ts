import SQL = require("./sql");

/** JSON-serializable value (string, number, boolean, null, plain object, or array of these). */
type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

declare class JSONBaseOperator {
  constructor(column: string, path?: string | string[]);
  column: string;
  path: string[];
  __toPath(path: string | string[]): [string | string[], boolean];
  toAliasedColumn(args?: any): string;
}

declare class JSONSerializer {
  static jsonb(value: JsonValue | string): string;
  static json(value: JsonValue | string): string;
}

declare class JSONBSetOperator extends JSONBaseOperator {
  constructor(
    column: string,
    path: string | string[],
    value: JsonValue,
    createMissingKeys?: boolean,
  );
  value: JsonValue;
  createMissingKeys: boolean;
  toSQL(): SQL;
}

declare class JSONBUnsetOperator extends JSONBaseOperator {
  constructor(column: string, path: string | string[]);
  toSQL(): SQL;
}

declare class JSONUnsetOperator extends JSONBaseOperator {
  constructor(column: string, path: string | string[]);
  toSQL(): SQL;
}

declare class JSONBInsertOperator extends JSONBaseOperator {
  constructor(
    column: string,
    path: string | string[],
    value: JsonValue,
    insertAfter?: boolean,
  );
  value: JsonValue;
  insertAfter: boolean;
  toSQL(): SQL;
}

declare class JSONBMergeOperator extends JSONBaseOperator {
  constructor(column: string, value: JsonValue);
  value: JsonValue;
  toSQL(): SQL;
}

declare class JSONBArrayAppendOperator extends JSONBaseOperator {
  constructor(column: string, path: string | string[], value: JsonValue);
  value: JsonValue;
  toSQL(): SQL;
}

declare class JSONBCounterOperator extends JSONBaseOperator {
  constructor(column: string, path: string | string[], delta?: number);
  delta: number;
  toSQL(): SQL;
}

declare class JSONBBooleanToggleOperator extends JSONBaseOperator {
  constructor(column: string, path: string | string[]);
  toSQL(): SQL;
}

declare class JSONBArrayMultiAppendOperator extends JSONBaseOperator {
  constructor(
    column: string,
    path: string | string[],
    values: JsonValue | JsonValue[],
  );
  values: JsonValue[];
  toSQL(): SQL;
}

declare class JSONBArrayPrependOperator extends JSONBaseOperator {
  constructor(column: string, path: string | string[], value: JsonValue);
  value: JsonValue;
  toSQL(): SQL;
}

declare class JSONBArrayMultiPrependOperator extends JSONBaseOperator {
  constructor(
    column: string,
    path: string | string[],
    values: JsonValue | JsonValue[],
  );
  values: JsonValue[];
  toSQL(): SQL;
}

declare class JSONBArrayRemoveAtOperator extends JSONBaseOperator {
  constructor(column: string, path: string | string[], index: number);
  index: number;
  toSQL(): SQL;
}

declare class JsonUpdateOperators {
  static setJsonb(
    column: string,
    path: string | string[],
    value: JsonValue,
    createMissingKeys?: boolean,
  ): SQL;
  static unsetJsonb(column: string, path: string | string[]): SQL;
  static unsetJson(column: string, path: string | string[]): SQL;
  static insertJsonb(
    column: string,
    path: string | string[],
    value: JsonValue,
    insertAfter?: boolean,
  ): SQL;
  static mergeJsonb(column: string, value: JsonValue): SQL;
  static arrayAppendJsonb(
    column: string,
    path: string | string[],
    value: JsonValue,
  ): SQL;
  static counterJsonb(
    column: string,
    path: string | string[],
    delta?: number,
  ): SQL;
  static booleanToggleJsonb(column: string, path: string | string[]): SQL;
  static arrayMultiAppendJsonb(
    column: string,
    path: string | string[],
    values: JsonValue | JsonValue[],
  ): SQL;
  static arrayPrependJsonb(
    column: string,
    path: string | string[],
    value: JsonValue,
  ): SQL;
  static arrayRemoveAtJsonb(
    column: string,
    path: string | string[],
    index: number,
  ): SQL;
  static arrayMultiPrependJsonb(
    column: string,
    path: string | string[],
    values: JsonValue | JsonValue[],
  ): SQL;
}

declare class JSONBCompareOperator extends JSONBaseOperator {
  constructor(
    column: string,
    path: string | string[],
    value: JsonValue,
    operator?: string,
  );
  value: JsonValue;
  operator: string;
  toSQL(): SQL;
}

declare class JSONCompareOperator extends JSONBaseOperator {
  constructor(
    column: string,
    path: string | string[],
    value: JsonValue,
    operator?: string,
  );
  value: JsonValue;
  operator: string;
  toSQL(): SQL;
}

declare class JsonWhereClauseOperators {
  static equalsJsonb(
    column: string,
    path: string | string[],
    value: JsonValue,
  ): SQL;
  static equalsJson(
    column: string,
    path: string | string[],
    value: JsonValue,
  ): SQL;
  static notEqualsJsonb(
    column: string,
    path: string | string[],
    value: JsonValue,
  ): SQL;
  static notEqualsJson(
    column: string,
    path: string | string[],
    value: JsonValue,
  ): SQL;
  static greaterThanJsonb(
    column: string,
    path: string | string[],
    value: JsonValue,
  ): SQL;
  static greaterThanJson(
    column: string,
    path: string | string[],
    value: JsonValue,
  ): SQL;
  static greaterThanOrEqualJsonb(
    column: string,
    path: string | string[],
    value: JsonValue,
  ): SQL;
  static greaterThanOrEqualJson(
    column: string,
    path: string | string[],
    value: JsonValue,
  ): SQL;
  static lessThanJsonb(
    column: string,
    path: string | string[],
    value: JsonValue,
  ): SQL;
  static lessThanJson(
    column: string,
    path: string | string[],
    value: JsonValue,
  ): SQL;
  static lessThanOrEqualJsonb(
    column: string,
    path: string | string[],
    value: JsonValue,
  ): SQL;
  static lessThanOrEqualJson(
    column: string,
    path: string | string[],
    value: JsonValue,
  ): SQL;
  static containsJsonb(
    column: string,
    path: string | string[],
    value: JsonValue,
  ): SQL;
  static containsJson(
    column: string,
    path: string | string[],
    value: JsonValue,
  ): SQL;
  static containedInJsonb(
    column: string,
    path: string | string[],
    value: JsonValue,
  ): SQL;
  static containedInJson(
    column: string,
    path: string | string[],
    value: JsonValue,
  ): SQL;
}

export {
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
