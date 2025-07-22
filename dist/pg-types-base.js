const PgType = {
  BIGINT: "bigint",

  INT8: "int8",

  BIGSERIAL: "bigserial",

  SERIAL8: "serial8",

  BIT: "bit",

  BIT_1: "bit",

  BIT_VARYING: "bit varying",

  VARBIT: "varbit",

  BOOLEAN: "boolean",

  BOOL: "bool",

  BOX: "box",

  BYTEA: "bytea",

  CHARACTER: "character",

  CHAR: "char",

  CHARACTER_VARYING: "character varying",

  VARCHAR: "varchar",

  CIDR: "cidr",

  CIRCLE: "circle",

  DATE: "date",

  DOUBLE_PRECISION: "double precision",

  FLOAT8: "float8",

  INET: "inet",

  INTEGER: "integer",

  INT: "int",

  INT4: "int4",

  INTERVAL: "interval",

  JSON: "json",

  JSONB: "jsonb",

  LINE: "line",

  LSEG: "lseg",

  MACADDR: "macaddr",

  MACADDR8: "macaddr8",

  MONEY: "money",

  NUMERIC: "numeric",

  DECIMAL: "decimal",

  PATH: "path",

  PG_LSN: "pg_lsn",

  PG_SNAPSHOT: "pg_snapshot",

  POINT: "point",

  POLYGON: "polygon",

  REAL: "real",

  FLOAT4: "float4",

  SMALLINT: "smallint",

  INT2: "int2",

  SMALLSERIAL: "smallserial",

  SERIAL2: "serial2",

  SERIAL: "serial",

  SERIAL4: "serial4",

  TEXT: "text",

  TIME: "time",

  TIME_WITHOUT_TIME_ZONE: "time without time zone",

  TIME_WITH_TIME_ZONE: "time with time zone",

  TIMETZ: "timetz",

  TIMESTAMP: "timestamp",

  TIMESTAMP_WITHOUT_TIME_ZONE: "timestamp without time zone",

  TIMESTAMP_WITH_TIME_ZONE: "timestamp with time zone",

  TIMESTAMPTZ: "timestamptz",

  TSQUERY: "tsquery",

  TSVECTOR: "tsvector",

  TXID_SNAPSHOT: "txid_snapshot",

  UUID: "uuid",

  XML: "xml",
};

const SupportLength = {
  [PgType.CHARACTER]: true,
  [PgType.CHAR]: true,
  [PgType.CHARACTER_VARYING]: true,
  [PgType.VARCHAR]: true,
  [PgType.BIT]: true,
  [PgType.BIT_1]: true,
  [PgType.BIT_VARYING]: true,
  [PgType.VARBIT]: true,
};

const SupportPrecisionScale = {
  [PgType.NUMERIC]: true,
  [PgType.DECIMAL]: true,
};

const NotSupportArray = {
  [PgType.BIGSERIAL]: true,
  [PgType.SERIAL]: true,
  [PgType.SERIAL2]: true,
  [PgType.SERIAL4]: true,
  [PgType.SERIAL4]: true,
  [PgType.SMALLSERIAL]: true,
};

class PgTypeBuilder {
  constructor(typeDef) {
    this.typeDef = typeDef;
    this._length = null;
    this._precision = null;
    this._scale = null;
    this._isArray = false;
  }

  length(n) {
    if (!this.typeDef.supportsLength) {
      throw new Error(`Type "${this.typeDef.name}" does not support length.`);
    }
    this._length = n;
    return this;
  }

  precision(p, s = null) {
    if (!this.typeDef.supportsPrecision) {
      throw new Error(
        `Type "${this.typeDef.name}" does not support precision.`
      );
    }
    this._precision = p;
    this._scale = s;
    return this;
  }

  array() {
    if (!this.typeDef.supportsArray) {
      throw new Error(
        `Type "${this.typeDef.name}" does not support array notation.`
      );
    }
    this._isArray = true;
    return this;
  }

  buildTypeString() {
    let str = this.typeDef.name;

    if (this._length !== null) {
      str += `(${this._length})`;
    } else if (this._precision !== null) {
      str += `(${this._precision}`;
      if (this._scale !== null) {
        str += `, ${this._scale}`;
      }
      str += ")";
    }

    if (this._isArray) {
      str += "[]";
    }

    return str;
  }

  toString() {
    return this.buildTypeString();
  }
}

class PGTypes {
  constructor() {
    this.types = this.__createTypeBuilder();
  }

  __createTypeBuilder() {
    const types = {};
    for (const [key, value] of Object.entries(PgType)) {
      types[key] = () =>
        new PgTypeBuilder({
          name: value,
          supportsArray: !NotSupportArray[value],
          supportsLength: SupportLength[value],
          supportsPrecision: SupportPrecisionScale[value],
        });
    }

    return types;
  }

  extend(key, value) {
    if (typeof key !== "string") {
      throw new Error(`Type key should be a string`);
    }
    if (typeof value !== "string") {
      throw new Error(`Type value should be a string`);
    }
    key = key.trim();
    value = value.trim();
    this.types[key] = () => new PgTypeBuilder(value);
  }
}

const x = new PGTypes();
x.types
